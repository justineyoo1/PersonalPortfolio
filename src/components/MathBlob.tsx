import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  radius: number;
  colorIdx: number;
  vx: number;
  vy: number;
  wanderAngle: number;
  wanderSpeed: number;
};

export default function MathBlob() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let t = 0;
    const dpr = window.devicePixelRatio || 1;
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const colors = [
      [0, 122, 255],
      [60, 100, 230],
      [88, 86, 214],
      [130, 90, 210],
      [160, 120, 230],
      [90, 180, 240],
    ];

    const accentColors = [
      [175, 82, 222],
      [90, 200, 250],
    ];

    const getColor = (idx: number, alpha: number) => {
      const i = Math.floor(idx) % colors.length;
      const j = (i + 1) % colors.length;
      const f = idx - Math.floor(idx);
      const r = Math.round(colors[i][0] + (colors[j][0] - colors[i][0]) * f);
      const g = Math.round(colors[i][1] + (colors[j][1] - colors[i][1]) * f);
      const b = Math.round(colors[i][2] + (colors[j][2] - colors[i][2]) * f);
      return `rgba(${r},${g},${b},${alpha})`;
    };

    const getAccentColor = (idx: number, alpha: number) => {
      const c = accentColors[Math.floor(idx) % accentColors.length];
      return `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
    };

    const cx = 0.48;
    const cy = 0.44;

    // Brain boundary test — is a point inside the brain shape?
    // Uses ellipse approximation for left/right hemispheres
    const isInsideBrain = (px: number, py: number): boolean => {
      // Left hemisphere ellipse
      const lx = 0.31, ly = 0.42, lrx = 0.19, lry = 0.28;
      const leftDist = ((px - lx) / lrx) ** 2 + ((py - ly) / lry) ** 2;
      // Right hemisphere ellipse
      const rx = 0.65, ry = 0.42, rrx = 0.19, rry = 0.28;
      const rightDist = ((px - rx) / rrx) ** 2 + ((py - ry) / rry) ** 2;
      // Brain stem
      const stemDist = Math.abs(px - 0.48) < 0.03 && py > 0.64 && py < 0.80;
      return leftDist < 1 || rightDist < 1 || stemDist;
    };

    // Generate particles filling the brain shape
    const particles: Particle[] = [];

    // Dense fill — scatter points inside brain boundary
    const addBrainParticle = (hx: number, hy: number, radius: number) => {
      particles.push({
        x: hx, y: hy, homeX: hx, homeY: hy,
        radius,
        colorIdx: Math.random() * colors.length,
        vx: 0, vy: 0,
        wanderAngle: Math.random() * Math.PI * 2,
        wanderSpeed: 0.3 + Math.random() * 0.7,
      });
    };

    // Fill left hemisphere densely
    for (let i = 0; i < 55; i++) {
      let hx, hy;
      do {
        hx = 0.13 + Math.random() * 0.35;
        hy = 0.14 + Math.random() * 0.56;
      } while (!isInsideBrain(hx, hy));
      addBrainParticle(hx, hy, 1.0 + Math.random() * 1.8);
    }

    // Fill right hemisphere densely
    for (let i = 0; i < 55; i++) {
      let hx, hy;
      do {
        hx = 0.48 + Math.random() * 0.35;
        hy = 0.14 + Math.random() * 0.56;
      } while (!isInsideBrain(hx, hy));
      addBrainParticle(hx, hy, 1.0 + Math.random() * 1.8);
    }

    // Brain stem particles
    for (let i = 0; i < 6; i++) {
      addBrainParticle(
        0.47 + Math.random() * 0.02,
        0.66 + i * 0.022,
        0.8 + Math.random() * 0.5,
      );
    }

    // A few larger "hub" nodes for visual interest
    const hubs: [number, number][] = [
      [0.28, 0.36], [0.34, 0.48], [0.22, 0.46], [0.38, 0.30],
      [0.68, 0.36], [0.62, 0.48], [0.74, 0.46], [0.58, 0.30],
      [0.30, 0.56], [0.66, 0.56], [0.40, 0.42], [0.56, 0.42],
    ];
    hubs.forEach(([hx, hy]) => addBrainParticle(hx, hy, 2.5 + Math.random() * 0.8));

    const connectionDist = 0.10;
    const firingPairs: { a: number; b: number; progress: number; speed: number; accent: boolean }[] = [];
    let nextFire = 0;

    // Soft boundary force — push particles back inside brain
    const constrainToBrain = (p: Particle) => {
      // Left hemisphere
      const lx = 0.31, ly = 0.42, lrx = 0.20, lry = 0.29;
      const leftDist = ((p.x - lx) / lrx) ** 2 + ((p.y - ly) / lry) ** 2;
      // Right hemisphere
      const rx = 0.65, ry = 0.42, rrx = 0.20, rry = 0.29;
      const rightDist = ((p.x - rx) / rrx) ** 2 + ((p.y - ry) / rry) ** 2;

      // Slightly larger boundary for soft constraint
      const inLeft = leftDist < 1.05;
      const inRight = rightDist < 1.05;
      const inStem = Math.abs(p.x - 0.48) < 0.04 && p.y > 0.64 && p.y < 0.82;

      if (!inLeft && !inRight && !inStem) {
        // Push back toward home
        p.vx += (p.homeX - p.x) * 0.02;
        p.vy += (p.homeY - p.y) * 0.02;
      }

      // Soft repulsion from center fissure gap (keeps hemispheres separated)
      if (p.homeX < 0.46 && p.x > 0.45 && p.y < 0.65) {
        p.vx -= 0.0008;
      } else if (p.homeX > 0.50 && p.x < 0.51 && p.y < 0.65) {
        p.vx += 0.0008;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const scale = Math.min(w, h);
      const ox = (w - scale) / 2;
      const oy = (h - scale) / 2;

      // Update particles — free-flowing with wander + home pull + boundary
      particles.forEach((p) => {
        // Wander: each particle drifts in a slowly changing direction
        p.wanderAngle += (Math.random() - 0.5) * 0.15;
        const wanderForce = 0.00015 * p.wanderSpeed;
        p.vx += Math.cos(p.wanderAngle) * wanderForce;
        p.vy += Math.sin(p.wanderAngle) * wanderForce;

        // Gentle pull toward home (keeps shape over time)
        const dx = p.homeX - p.x;
        const dy = p.homeY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0.03) {
          p.vx += dx * 0.003;
          p.vy += dy * 0.003;
        }

        // Global breathing
        const breatheX = (p.x - cx) * Math.sin(t * 0.3) * 0.0003;
        const breatheY = (p.y - cy) * Math.sin(t * 0.3) * 0.0003;
        p.vx += breatheX;
        p.vy += breatheY;

        // Boundary constraint
        constrainToBrain(p);

        // Damping
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Apply velocity
        p.x += p.vx;
        p.y += p.vy;
      });

      // ── Neural connections ──
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            // Fade connections that cross the fissure
            const crossesFissure =
              (particles[i].homeX < 0.46 && particles[j].homeX > 0.50) ||
              (particles[i].homeX > 0.50 && particles[j].homeX < 0.46);
            const fissureFade = crossesFissure ? 0.3 : 1;

            const alpha = (1 - dist / connectionDist) * 0.12 * fissureFade;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(90,110,200,${alpha})`;
            ctx.lineWidth = 0.4;
            ctx.moveTo(ox + particles[i].x * scale, oy + particles[i].y * scale);
            ctx.lineTo(ox + particles[j].x * scale, oy + particles[j].y * scale);
            ctx.stroke();
          }
        }
      }

      // ── Synapse firings (frequent, lively) ──
      if (t > nextFire) {
        const a = Math.floor(Math.random() * particles.length);
        let closest = -1;
        let closestDist = Infinity;
        for (let j = 0; j < particles.length; j++) {
          if (j === a) continue;
          const dx = particles[a].x - particles[j].x;
          const dy = particles[a].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < connectionDist * 1.2 && d < closestDist) {
            closestDist = d;
            closest = j;
          }
        }
        if (closest >= 0) {
          firingPairs.push({
            a, b: closest, progress: 0,
            speed: 0.015 + Math.random() * 0.025,
            accent: Math.random() < 0.25,
          });
        }
        nextFire = t + 0.08 + Math.random() * 0.25;
      }

      for (let f = firingPairs.length - 1; f >= 0; f--) {
        const fire = firingPairs[f];
        fire.progress += fire.speed;
        if (fire.progress > 1) { firingPairs.splice(f, 1); continue; }

        const pa = particles[fire.a];
        const pb = particles[fire.b];
        const px = pa.x + (pb.x - pa.x) * fire.progress;
        const py = pa.y + (pb.y - pa.y) * fire.progress;
        const sx = ox + px * scale;
        const sy = oy + py * scale;

        const pulseAlpha = Math.sin(fire.progress * Math.PI) * 0.75;
        const colorFn = fire.accent ? getAccentColor : getColor;
        const cLen = fire.accent ? accentColors.length : colors.length;
        const colorIdx = (t * 0.4 + fire.a * 0.1) % cLen;

        const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, 5);
        grad.addColorStop(0, colorFn(colorIdx, pulseAlpha));
        grad.addColorStop(1, colorFn(colorIdx, 0));
        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(sx, sy, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Draw particles ──
      particles.forEach((p) => {
        const px = ox + p.x * scale;
        const py = oy + p.y * scale;
        const colorIdx = (p.colorIdx + t * 0.05) % colors.length;
        const pulse = 0.3 + Math.sin(t * 1.0 + p.colorIdx * 2.5) * 0.2;

        // Soft glow
        const grad = ctx.createRadialGradient(px, py, 0, px, py, p.radius * 3);
        grad.addColorStop(0, getColor(colorIdx, pulse * 0.2));
        grad.addColorStop(1, getColor(colorIdx, 0));
        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(px, py, p.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.fillStyle = getColor(colorIdx, pulse + 0.15);
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      t += 0.016;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
