import { useState } from 'react';
import './gallery.css';

interface Slide {
  src: string;
  name: string;
}

const SLIDES: Slide[] = [
  { src: '/asset 3.avif',  name: 'VILLA AURELIA'    },
  { src: '/asset 4.avif',  name: 'MERIDIAN RETREAT'  },
  { src: '/asset 5.avif',  name: 'CASA LUMINA'       },
  { src: '/asset 7.avif',  name: 'THE SERAI HOUSE'   },
  { src: '/asset 8.avif',  name: 'TERRACE PAVILION'  },
  { src: '/asset 9.avif',  name: 'KALA RESIDENCE'    },
  { src: '/asset 10.avif', name: 'STUDIO VALE'       },
  { src: '/asset 12.avif', name: 'GROVE HOUSE'       },
  { src: '/asset 13.avif', name: 'ALTA VILLA'        },
  { src: '/asset 15.avif', name: 'PINE LODGE'        },
];

const COLLECTION_DESC =
  'In each project by OURA\u00a0& CO., every room reveals more than design — it holds a pause, a warmth, a way of being. Shaped by natural light and honest material, each space is a quiet confrontation with how we live, stripped of excess and full of intention, intimacy, and lasting presence.';

function pad(n: number) {
  return String(n + 1).padStart(2, '0');
}

export default function Gallery() {
  const [active, setActive] = useState(0);

  return (
    <section className="gallery-section" aria-label="Selected projects">
      <div className="gallery-body">

        {/* ── Left ── */}
        <div className="gallery-left">
          <div className="gallery-desc">
            <p>{COLLECTION_DESC}</p>
          </div>
          <div className="gallery-left-bottom">
            <span className="gallery-counter">
              ({pad(active)}&nbsp;/&nbsp;{String(SLIDES.length).padStart(2, '0')})
            </span>
            <h2 className="gallery-title">{SLIDES[active].name}.</h2>
          </div>
        </div>

        {/* ── Right ── */}
        <div className="gallery-right">
          <div className="gallery-img-wrap">
            {SLIDES.map((slide, i) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.name}
                className={`gallery-img${i === active ? ' is-active' : ''}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding={i === 0 ? 'sync' : 'async'}
                draggable={false}
              />
            ))}
          </div>
          <div className="gallery-caption">
            <span className="gallery-caption-num">/{pad(active)}</span>
            <span className="gallery-caption-name">{SLIDES[active].name}</span>
          </div>
        </div>

      </div>

      {/* ── Thumbnail strip ── */}
      <div className="gallery-strip" role="tablist" aria-label="Project thumbnails">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            className={`gallery-thumb${i === active ? ' is-active' : ''}`}
            role="tab"
            aria-selected={i === active}
            aria-label={`View ${slide.name}`}
            onClick={() => setActive(i)}
          >
            <span className="thumb-num">/{pad(i)}</span>
            <div className="thumb-img-wrap">
              <img
                src={slide.src}
                alt={slide.name}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
