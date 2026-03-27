import { useState } from 'react';
import './contact.css';

interface ContactAction {
  label:  string;
  detail: string;
  href?:  string;
}

interface Props {
  heading?:   string;
  body?:      string;
  brandName?: string;
  intro?:     string;
  actions?:   ContactAction[];
}

export default function Contact({
  heading   = 'GOT A SPACE WORTH DESIGNING?',
  body      = ' is open to new projects and bold visions. Write to us — and we will turn your space into a feeling.',
  brandName = 'OURA & CO.',
  intro     = 'Every project begins with a <strong>single conversation</strong>. Your vision can become the <strong>impetus</strong> that leads to a new space, a new aesthetic, a new experience. We are always available to <strong>hear from you</strong>.',
  actions   = [
    { label: 'BOOK A CALL',  detail: '+91 98765 43210',      href: 'tel:+919876543210' },
    { label: 'EMAIL US',     detail: 'studio@ouraandco.com', href: 'mailto:studio@ouraandco.com' },
    { label: 'MESSAGE US',   detail: 'DM us on Instagram',   href: '#' },
  ],
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function handleToggle(i: number) {
    setOpenIndex(prev => (prev === i ? null : i));
  }

  return (
    <section className="contact-section" aria-labelledby="contact-heading">
      <div className="contact-grid">

        <div className="contact-left">
          <h2 id="contact-heading" className="contact-heading">{heading}</h2>
          <p className="contact-body">
            <span className="contact-brand">{brandName}</span>{body}
          </p>
        </div>

        <div className="contact-right">
          <p
            className="contact-intro"
            dangerouslySetInnerHTML={{ __html: intro }}
          />

          <ul className="contact-actions" role="list">
            {actions.map((action, i) => {
              const isOpen = openIndex === i;
              const panelId = `contact-panel-${i}`;
              return (
                <li key={i} className="contact-item">
                  <button
                    className="contact-toggle"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => handleToggle(i)}
                  >
                    <span className="contact-label">{action.label}</span>
                    <span className="contact-icon" aria-hidden="true">+</span>
                  </button>

                  <div
                    id={panelId}
                    className={`contact-panel${isOpen ? ' is-open' : ''}`}
                    role="region"
                  >
                    <div className="contact-panel-inner">
                      {action.href
                        ? <a href={action.href} className="contact-detail-link">{action.detail}</a>
                        : <span className="contact-detail-text">{action.detail}</span>
                      }
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

      </div>
    </section>
  );
}
