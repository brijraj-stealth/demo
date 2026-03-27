import { useEffect, useRef } from 'react';
import './works.css';

interface Project {
  src: string;
  name: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
}

const projects: Project[] = [
  { src: '/asset 3.avif',  name: 'VILLA AURELIA',    size: 'md' },
  { src: '/asset 4.avif',  name: 'MERIDIAN RETREAT',  size: 'lg' },
  { src: '/asset 5.avif',  name: 'CASA LUMINA',       size: 'sm' },
  { src: '/asset 7.avif',  name: 'THE SERAI HOUSE',   size: 'xl' },
  { src: '/asset 8.avif',  name: 'TERRACE PAVILION',  size: 'sm' },
  { src: '/asset 9.avif',  name: 'KALA RESIDENCE',    size: 'md' },
  { src: '/asset 10.avif', name: 'STUDIO VALE',       size: 'lg' },
  { src: '/asset 12.avif', name: 'GROVE HOUSE',       size: 'sm' },
  { src: '/asset 13.avif', name: 'ALTA VILLA',        size: 'xl' },
  { src: '/asset 15.avif', name: 'PINE LODGE',        size: 'md' },
  { src: '/asset 17.avif', name: 'REVA COURT',        size: 'lg' },
  { src: '/asset 18.avif', name: 'SOLEIL MANOR',      size: 'sm' },
  { src: '/asset 19.avif', name: 'DUSK PAVILION',     size: 'md' },
  { src: '/asset 21.avif', name: 'HAVEN ESTATE',      size: 'lg' },
];

const sizeMap = {
  sm: { w: 190, h: 240 },
  md: { w: 240, h: 320 },
  lg: { w: 290, h: 400 },
  xl: { w: 350, h: 480 },
} as const;

const doubled = [...projects, ...projects];

export default function Works() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    const AUTO = 0.45;
    const FRICTION = 0.92;
    const THROW_MUL = 0.55;
    const MAX_VEL = 22;

    let x = 0;
    let velocity = AUTO;
    let isDown = false;
    let lastX = 0;
    let lastDelta = 0;
    let animationId: number;
    let destroyed = false;

    function half() {
      return track!.scrollWidth / 2;
    }

    function wrap() {
      const h = half();
      if (x <= -h) x += h;
      if (x > 0) x -= h;
    }

    function tick() {
      if (destroyed) return;

      if (!isDown) {
        if (Math.abs(velocity) > AUTO * 1.05) {
          velocity *= FRICTION;
          if (Math.abs(velocity) < AUTO) {
            velocity = Math.sign(velocity) * AUTO;
          }
        } else {
          velocity += (AUTO - velocity) * 0.04;
        }
        x -= velocity;
        wrap();
        track!.style.transform = `translateX(${x}px)`;
      }

      animationId = requestAnimationFrame(tick);
    }

    function handlePointerDown(e: PointerEvent) {
      outer!.setPointerCapture(e.pointerId);
      isDown = true;
      lastX = e.clientX;
      lastDelta = 0;
      velocity = 0;
      outer!.classList.add('grabbing');
      e.preventDefault();
    }

    function handlePointerMove(e: PointerEvent) {
      if (!isDown) return;
      lastDelta = e.clientX - lastX;
      x += lastDelta;
      lastX = e.clientX;
      wrap();
      track!.style.transform = `translateX(${x}px)`;
    }

    function release() {
      if (!isDown) return;
      isDown = false;
      outer!.classList.remove('grabbing');
      velocity = -lastDelta * THROW_MUL;
      velocity = Math.max(-MAX_VEL, Math.min(MAX_VEL, velocity));
      if (Math.abs(velocity) < AUTO * 0.5) {
        velocity = AUTO;
      }
    }

    function handleDragStart(e: DragEvent) {
      e.preventDefault();
    }

    outer.addEventListener('pointerdown',   handlePointerDown,   { passive: false });
    outer.addEventListener('pointermove',   handlePointerMove,   { passive: true });
    outer.addEventListener('pointerup',     release,             { passive: true });
    outer.addEventListener('pointercancel', release,             { passive: true });
    outer.addEventListener('dragstart',     handleDragStart);

    animationId = requestAnimationFrame(tick);

    return () => {
      destroyed = true;
      cancelAnimationFrame(animationId);
      outer.removeEventListener('pointerdown',   handlePointerDown);
      outer.removeEventListener('pointermove',   handlePointerMove);
      outer.removeEventListener('pointerup',     release);
      outer.removeEventListener('pointercancel', release);
      outer.removeEventListener('dragstart',     handleDragStart);
    };
  }, []);

  return (
    <section className="works-section" aria-labelledby="works-heading">
      <div className="marquee-outer" ref={outerRef} role="region" aria-label="Project showcase carousel">
        <div className="marquee-track" ref={trackRef}>
          {doubled.map((p, i) => {
            const { w, h } = sizeMap[p.size];
            return (
              <article key={i} className="project-item" style={{ width: `${w}px` }}>
                <div className="project-img-wrap" style={{ height: `${h}px` }}>
                  <img
                    src={p.src}
                    alt={p.name}
                    width={w}
                    height={h}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </div>
                <h3 className="project-name">{p.name}</h3>
              </article>
            );
          })}
        </div>
      </div>

      <footer className="works-footer">
        <h2 id="works-heading" className="works-heading">WORKS</h2>
        <nav className="works-links" aria-label="Works navigation">
          <a href="#" className="works-link" aria-label="View in progress projects">
            IN PROGRESS
            <svg xmlns="http://www.w3.org/2000/svg" height="13px" viewBox="0 -960 960 960" width="13px" fill="currentColor" aria-hidden="true">
              <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/>
            </svg>
          </a>
          <a href="#" className="works-link" aria-label="View archived projects">
            ARCHIVE
            <svg xmlns="http://www.w3.org/2000/svg" height="13px" viewBox="0 -960 960 960" width="13px" fill="currentColor" aria-hidden="true">
              <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/>
            </svg>
          </a>
        </nav>
      </footer>
    </section>
  );
}
