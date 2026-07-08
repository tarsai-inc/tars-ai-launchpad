import { useEffect, useRef, useState, useCallback } from "react";
import SectionHeader from "./SectionHeader";

/* ────────────────────────────────────────────────────────────────
   TARS depot orchestration — live schematic simulation.
   Canvas 2D, logical space 1000×440, DPR-aware, paused offscreen,
   static frame under prefers-reduced-motion.
   ──────────────────────────────────────────────────────────────── */

const W = 1000;
const H = 440;
const LANE_Y = 224;

const C = {
  line: "hsla(216, 16%, 22%, 1)",
  lineSoft: "hsla(216, 16%, 16%, 0.8)",
  zone: "hsla(216, 20%, 55%, 0.55)",
  label: "hsla(215, 11%, 58%, 0.9)",
  faint: "hsla(216, 10%, 52%, 0.9)",
  amber: "hsla(38, 94%, 54%, 1)",
  amberDim: "hsla(38, 94%, 54%, 0.35)",
  blue: "hsla(205, 55%, 58%, 1)",
  ok: "hsla(152, 42%, 52%, 1)",
  body: "hsla(210, 15%, 78%, 1)",
  bodyDim: "hsla(213, 12%, 60%, 1)",
  hold: "hsla(0, 72%, 58%, 1)",
} as const;

interface Bay {
  x: number;
  y: number;
  occupant: number | null;
}

interface Stage {
  id: string;
  label: string;
  x0: number;
  x1: number;
  bays: Bay[];
  dwell: [number, number]; // seconds min,max
  color: string;
  verb: string; // log line on completion
}

const makeStages = (): Stage[] => [
  {
    id: "intake", label: "INTAKE", x0: 34, x1: 128, color: C.body, verb: "intake logged",
    bays: [{ x: 81, y: LANE_Y, occupant: null }], dwell: [2.5, 4],
  },
  {
    id: "charge", label: "CHARGE", x0: 158, x1: 336, color: C.blue, verb: "charge complete",
    bays: [
      { x: 205, y: 108, occupant: null },
      { x: 289, y: 108, occupant: null },
      { x: 205, y: 340, occupant: null },
      { x: 289, y: 340, occupant: null },
    ],
    dwell: [7, 12],
  },
  {
    id: "detail", label: "DETAIL", x0: 366, x1: 484, color: C.amber, verb: "detail complete",
    bays: [
      { x: 425, y: 108, occupant: null },
      { x: 425, y: 340, occupant: null },
    ],
    dwell: [5, 8],
  },
  {
    id: "inspect", label: "INSPECT", x0: 514, x1: 632, color: C.amber, verb: "inspection pass",
    bays: [
      { x: 573, y: 108, occupant: null },
      { x: 573, y: 340, occupant: null },
    ],
    dwell: [4, 7],
  },
  {
    id: "stage", label: "STAGE", x0: 662, x1: 848, color: C.ok, verb: "staged · ready",
    bays: [
      { x: 700, y: LANE_Y, occupant: null },
      { x: 755, y: LANE_Y, occupant: null },
      { x: 810, y: LANE_Y, occupant: null },
    ],
    dwell: [3.5, 7],
  },
];

interface Vehicle {
  id: number;
  callsign: string;
  x: number;
  y: number;
  stageIdx: number; // index into stages; stages.length => exiting
  bayIdx: number | null;
  phase: "queue" | "toBay" | "service" | "toLane" | "exit";
  path: { x: number; y: number }[];
  pathT: number;
  dwellLeft: number;
  dwellTotal: number;
  hold: number; // >0 while on safety hold
  pace: number; // per-vehicle speed factor
}

interface SimEvent {
  t: string;
  text: string;
  tone: "amber" | "ok" | "blue" | "dim" | "hold";
}

const SPEED = 95; // px per sim-second
const rand = (a: number, b: number) => a + Math.random() * (b - a);

const DepotViz = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<SimEvent[]>([]);
  const [kpi, setKpi] = useState({ onSite: 0, inService: 0, ready: 0, dispatched: 0 });
  const [clock, setClock] = useState("06:12:04");
  const reduced = useRef(false);

  const pushEvent = useCallback((e: SimEvent) => {
    setEvents((prev) => [e, ...prev].slice(0, 9));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const stages = makeStages();
    const vehicles: Vehicle[] = [];
    let nextId = 200 + Math.floor(Math.random() * 20);
    let simTime = 6 * 3600 + 12 * 60 + 4; // 06:12:04
    let dispatched = 0;
    let spawnIn = 0.5;
    let running = true;
    let raf = 0;
    let last = 0;
    let scale = 1;

    const fmt = (t: number) => {
      const h = Math.floor(t / 3600) % 24;
      const m = Math.floor((t % 3600) / 60);
      const s = Math.floor(t % 60);
      return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
    };

    let redraw = () => {};
    const resize = () => {
      const w = wrap.clientWidth;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      scale = w / W;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(w * (H / W) * dpr);
      canvas.style.height = `${w * (H / W)}px`;
      ctx.setTransform((w / W) * dpr, 0, 0, (w / W) * dpr, 0, 0);
      redraw();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const spawn = () => {
      const v: Vehicle = {
        id: nextId,
        callsign: `AV-${nextId}`,
        x: -30,
        y: LANE_Y,
        stageIdx: 0,
        bayIdx: null,
        phase: "queue",
        path: [],
        pathT: 0,
        dwellLeft: 0,
        dwellTotal: 0,
        hold: 0,
        pace: rand(0.85, 1.15),
      };
      nextId += 1 + Math.floor(Math.random() * 3);
      vehicles.push(v);
      pushEvent({ t: fmt(simTime), text: `${v.callsign} arrival · returning from service`, tone: "dim" });
    };

    const routeToBay = (v: Vehicle, stage: Stage, bayIdx: number) => {
      const bay = stage.bays[bayIdx];
      bay.occupant = v.id;
      v.bayIdx = bayIdx;
      v.phase = "toBay";
      v.path =
        bay.y === LANE_Y
          ? [{ x: bay.x, y: LANE_Y }]
          : [
              { x: bay.x, y: LANE_Y },
              { x: bay.x, y: bay.y },
            ];
      v.pathT = 0;
    };

    const step = (dt: number) => {
      simTime += dt;
      spawnIn -= dt;
      const capacity = stages.reduce((n, s) => n + s.bays.length, 0);
      if (spawnIn <= 0 && vehicles.length < capacity + 3) {
        spawn();
        spawnIn = rand(3.5, 7.5);
      }

      for (const v of vehicles) {
        const stage = stages[v.stageIdx];
        switch (v.phase) {
          case "queue": {
            // hold short of the stage until a bay frees; stack arrivals behind
            const slot = vehicles.filter(
              (o) => o !== v && o.phase === "queue" && o.stageIdx === v.stageIdx && vehicles.indexOf(o) < vehicles.indexOf(v)
            ).length;
            const queueX = stage.x0 - 26 - slot * 34;
            const free = stage.bays.findIndex((b) => b.occupant === null);
            if (slot === 0 && free >= 0 && v.x >= queueX - 4) {
              routeToBay(v, stage, free);
            } else if (v.x < queueX) {
              v.x = Math.min(v.x + SPEED * v.pace * dt, queueX);
            }
            break;
          }
          case "toBay":
          case "toLane":
          case "exit": {
            const target = v.path[0];
            if (!target) {
              if (v.phase === "toBay") {
                v.phase = "service";
                v.dwellTotal = rand(...stage.dwell);
                v.dwellLeft = v.dwellTotal;
                // occasional safety hold at inspect
                if (stage.id === "inspect" && Math.random() < 0.18) {
                  v.hold = rand(2, 3.5);
                  pushEvent({ t: fmt(simTime), text: `${v.callsign} safety hold · sensor recheck`, tone: "hold" });
                }
              } else if (v.phase === "toLane") {
                v.stageIdx += 1;
                v.phase = v.stageIdx >= stages.length ? "exit" : "queue";
                if (v.phase === "exit") {
                  v.path = [{ x: W + 40, y: LANE_Y }];
                  dispatched += 1;
                  pushEvent({ t: fmt(simTime), text: `${v.callsign} dispatched · service loop`, tone: "amber" });
                }
              }
              break;
            }
            const dx = target.x - v.x;
            const dy = target.y - v.y;
            const dist = Math.hypot(dx, dy);
            const step = SPEED * v.pace * dt;
            if (dist <= step) {
              v.x = target.x;
              v.y = target.y;
              v.path.shift();
            } else {
              v.x += (dx / dist) * step;
              v.y += (dy / dist) * step;
            }
            break;
          }
          case "service": {
            if (v.hold > 0) {
              v.hold -= dt;
              if (v.hold <= 0) {
                pushEvent({ t: fmt(simTime), text: `${v.callsign} hold cleared · 38 checks pass`, tone: "ok" });
              }
              break;
            }
            v.dwellLeft -= dt;
            if (v.dwellLeft <= 0) {
              const tone = stage.id === "charge" ? "blue" : stage.id === "stage" ? "ok" : "ok";
              const extra =
                stage.id === "charge"
                  ? ` · SoC ${Math.floor(rand(88, 98))}%`
                  : stage.id === "inspect"
                    ? ` · ${Math.floor(rand(38, 44))} checks`
                    : "";
              pushEvent({ t: fmt(simTime), text: `${v.callsign} ${stage.verb}${extra}`, tone });
              const bay = stage.bays[v.bayIdx!];
              bay.occupant = null;
              v.bayIdx = null;
              v.phase = "toLane";
              v.path =
                bay.y === LANE_Y
                  ? [{ x: stage.x1 + 16, y: LANE_Y }]
                  : [
                      { x: bay.x, y: LANE_Y },
                      { x: stage.x1 + 16, y: LANE_Y },
                    ];
            }
            break;
          }
        }
      }

      // remove exited
      for (let i = vehicles.length - 1; i >= 0; i--) {
        if (vehicles[i].phase === "exit" && vehicles[i].x > W + 30) vehicles.splice(i, 1);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // fine grid
      ctx.strokeStyle = C.lineSoft;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 40) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
      }
      for (let y = 0; y <= H; y += 40) {
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
      }
      ctx.stroke();

      // main lane
      ctx.strokeStyle = C.line;
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(0, LANE_Y - 16);
      ctx.lineTo(W, LANE_Y - 16);
      ctx.moveTo(0, LANE_Y + 16);
      ctx.lineTo(W, LANE_Y + 16);
      ctx.stroke();
      // center dashes
      ctx.strokeStyle = C.lineSoft;
      ctx.setLineDash([8, 10]);
      ctx.beginPath();
      ctx.moveTo(0, LANE_Y);
      ctx.lineTo(W, LANE_Y);
      ctx.stroke();
      ctx.setLineDash([]);
      // flow chevrons
      ctx.strokeStyle = "hsla(215, 14%, 34%, 0.9)";
      ctx.lineWidth = 1;
      for (let cx = 40; cx < W; cx += 120) {
        ctx.beginPath();
        ctx.moveTo(cx - 3, LANE_Y - 5);
        ctx.lineTo(cx + 3, LANE_Y);
        ctx.lineTo(cx - 3, LANE_Y + 5);
        ctx.stroke();
      }

      // dispatch gate
      ctx.strokeStyle = C.amberDim;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(902, LANE_Y - 46);
      ctx.lineTo(902, LANE_Y + 46);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.label;
      ctx.font = "10px 'IBM Plex Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText("DISPATCH", 916, 96);
      ctx.fillStyle = C.faint;
      ctx.fillText("→ SERVICE", 916, 112);

      // stages
      for (const s of stages) {
        // zone outline
        ctx.strokeStyle = C.line;
        ctx.setLineDash([3, 5]);
        ctx.strokeRect(s.x0, 62, s.x1 - s.x0, H - 116);
        ctx.setLineDash([]);
        // label
        ctx.fillStyle = C.label;
        ctx.font = "10px 'IBM Plex Mono', monospace";
        ctx.textAlign = "left";
        ctx.fillText(s.label, s.x0, 50);
        const used = s.bays.filter((b) => b.occupant !== null).length;
        ctx.fillStyle = C.faint;
        ctx.fillText(`${used}/${s.bays.length}`, s.x0, H - 36);

        // bays
        for (const b of s.bays) {
          const occupied = b.occupant !== null;
          ctx.strokeStyle = occupied ? C.zone : C.line;
          ctx.lineWidth = 1;
          if (b.y !== LANE_Y) {
            ctx.strokeRect(b.x - 22, b.y - 26, 44, 52);
          } else {
            ctx.strokeRect(b.x - 24, b.y - 15, 48, 30);
          }
        }
      }

      // vehicles
      for (const v of vehicles) {
        const stage = stages[v.stageIdx];
        const servicing = v.phase === "service";
        const onHold = servicing && v.hold > 0;
        const color = onHold
          ? C.hold
          : servicing
            ? stage.color
            : v.phase === "exit"
              ? C.ok
              : C.bodyDim;

        // body
        ctx.fillStyle = "hsla(217, 24%, 10%, 1)";
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        const vw = 26;
        const vh = 13;
        ctx.beginPath();
        const r = 3.5;
        const x0 = v.x - vw / 2;
        const y0 = v.y - vh / 2;
        ctx.roundRect(x0, y0, vw, vh, r);
        ctx.fill();
        ctx.stroke();
        // status dot
        ctx.fillStyle = color;
        ctx.fillRect(v.x - 1.5, v.y - 1.5, 3, 3);

        // progress ring while servicing
        if (servicing && !onHold) {
          const p = 1 - v.dwellLeft / v.dwellTotal;
          ctx.strokeStyle = stage.color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(v.x, v.y, 13, -Math.PI / 2, -Math.PI / 2 + p * Math.PI * 2);
          ctx.stroke();
        }
        if (onHold) {
          ctx.strokeStyle = C.hold;
          ctx.setLineDash([2, 3]);
          ctx.beginPath();
          ctx.arc(v.x, v.y, 13, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // callsign
        if (scale > 0.55) {
          ctx.fillStyle = C.faint;
          ctx.font = "8px 'IBM Plex Mono', monospace";
          ctx.textAlign = "center";
          ctx.fillText(v.callsign, v.x, v.y - 18);
        }
      }
    };

    const syncReact = () => {
      const inService = vehicles.filter((v) => v.phase === "service").length;
      const ready = stages[4].bays.filter((b) => b.occupant !== null).length;
      setKpi({ onSite: vehicles.length, inService, ready, dispatched });
      setClock(fmt(simTime));
    };

    let kpiAccum = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      step(dt);
      kpiAccum += dt;
      if (kpiAccum > 0.5) {
        kpiAccum = 0;
        syncReact();
      }
      draw();
    };

    redraw = draw;

    // pre-roll so the depot is populated immediately
    for (let i = 0; i < 260; i++) step(0.25);
    setEvents((prev) => prev.slice(0, 9));
    syncReact();
    draw();

    if (reduced.current) {
      // static frame only
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting && !document.hidden;
        last = performance.now();
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);
    const onVis = () => {
      running = !document.hidden;
      last = performance.now();
    };
    document.addEventListener("visibilitychange", onVis);

    last = performance.now();
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [pushEvent]);

  const toneClass: Record<SimEvent["tone"], string> = {
    amber: "text-primary",
    ok: "text-ok",
    blue: "text-data-blue",
    dim: "text-dim",
    hold: "text-destructive",
  };

  return (
    <section id="command" className="py-24 md:py-32 scroll-mt-16">
      <div className="container">
        <SectionHeader
          index="03"
          label="Command"
          title={
            <>
              Every vehicle. Every bay.
              <br />
              <span className="text-dim">One command surface.</span>
            </>
          }
          lede="This is how TARS sees a depot: a controlled system, not a parking lot. Vehicles move through charge, detail, inspection, and staging on system-issued tasks — every step verified before dispatch."
        />

        <div className="corner-ticks border border-line bg-ink-deep">
          {/* Panel header */}
          <div className="flex items-center gap-4 px-5 md:px-6 min-h-12 py-2.5 border-b border-line">
            <span className="inline-block w-2 h-2 bg-ok animate-signal" aria-hidden="true" />
            <span className="voice-label text-foreground">Depot 07 — Live orchestration</span>
            <span className="hidden md:inline voice-label text-faint">Shift B</span>
            <span className="flex-1" />
            <span className="font-mono-ui text-xs text-dim tabular-nums" aria-hidden="true">{clock}</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_300px]">
            {/* Canvas */}
            <div className="overflow-x-auto">
              <div ref={wrapRef} className="min-w-[640px]">
                <canvas
                  ref={canvasRef}
                  role="img"
                  aria-label="Animated schematic of a TARS-run depot: autonomous vehicles moving through intake, charging, detailing, inspection, and staging bays before dispatch"
                  className="block w-full"
                />
              </div>
            </div>

            {/* Event log + KPIs */}
            <aside className="border-t lg:border-t-0 lg:border-l border-line flex flex-col" aria-label="Depot activity feed">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 border-b border-line">
                {[
                  { k: "On site", v: kpi.onSite },
                  { k: "In task", v: kpi.inService },
                  { k: "Ready", v: kpi.ready },
                  { k: "Dispatched", v: kpi.dispatched },
                ].map((item, i) => (
                  <div
                    key={item.k}
                    className={`px-4 py-3 border-line ${i % 2 === 1 ? "border-l" : ""} ${
                      i > 1 ? "border-t sm:border-t-0 lg:border-t" : ""
                    } ${i === 2 ? "sm:border-l lg:border-l-0" : ""} ${i === 3 ? "sm:border-l" : ""}`}
                  >
                    <div className="voice-label text-faint text-[0.575rem]">{item.k}</div>
                    <div className="font-mono-ui text-lg text-foreground tabular-nums">{item.v}</div>
                  </div>
                ))}
              </div>
              <div className="p-4 flex-1 min-h-[180px]">
                <div className="voice-label text-faint mb-3">Shift log</div>
                {/* decorative simulated feed — excluded from AT */}
                <ul className="space-y-1.5" aria-hidden="true">
                  {events.map((e, i) => (
                    <li
                      key={`${e.t}-${e.text}`}
                      className="font-mono-ui text-[0.685rem] leading-snug flex gap-2"
                    >
                      <span className={`tabular-nums shrink-0 ${i === 0 ? "text-primary" : "text-faint"}`}>
                        {e.t}
                      </span>
                      <span className={toneClass[e.tone]}>{e.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>

        <p className="mt-6 font-mono-ui text-[0.7rem] uppercase tracking-[0.14em] text-faint">
          Simulated feed · Representative of TARS depot orchestration
        </p>
      </div>
    </section>
  );
};

export default DepotViz;
