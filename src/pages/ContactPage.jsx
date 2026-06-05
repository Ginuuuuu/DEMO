import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div style={{ padding: 'clamp(32px, 6vw, 52px) clamp(16px, 4vw, 48px) clamp(64px, 10vw, 100px)', maxWidth: 1200, margin: '0 auto' }}>
      <Link
        to="/"
        style={{
          fontSize: 10,
          letterSpacing: '0.32em',
          color: 'rgba(200,169,102,0.45)',
          marginBottom: 28,
          display: 'inline-block',
        }}
      >
        ← BACK TO HOME
      </Link>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(36px, 8vw, 72px)',
          fontWeight: 300,
          fontStyle: 'italic',
          marginBottom: 8,
        }}
      >
        Get in Touch
      </motion.h1>
      <p style={{ fontSize: 11, color: 'rgba(232,228,220,0.35)', letterSpacing: '0.1em', marginBottom: 48 }}>
        We're here to help with styling, sizing, and orders
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(32px, 6vw, 56px)',
        }}
      >
        <div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, marginBottom: 24 }}>Contact Information</h3>

          {[
            { label: 'Email', value: 'hello@elegance.com', href: 'mailto:hello@elegance.com' },
            { label: 'Phone', value: '+91 (800) 123-4567', href: 'tel:+918001234567' },
          ].map((row) => (
            <div key={row.label} style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 9, letterSpacing: '0.22em', color: 'rgba(200,169,102,0.55)', marginBottom: 6 }}>{row.label}</p>
              <a href={row.href} style={{ fontSize: 14, color: '#E8E4DC', fontWeight: 300 }}>
                {row.value}
              </a>
            </div>
          ))}

          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 9, letterSpacing: '0.22em', color: 'rgba(200,169,102,0.55)', marginBottom: 6 }}>Headquarters</p>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(232,228,220,0.75)' }}>
              ELEGANCE Fashion House
              <br />
              123 Fashion Avenue
              <br />
              Mumbai, MH 400001
              <br />
              India
            </p>
          </div>

          <div>
            <p style={{ fontSize: 9, letterSpacing: '0.22em', color: 'rgba(200,169,102,0.55)', marginBottom: 6 }}>Hours</p>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(232,228,220,0.75)' }}>
              Mon – Fri: 10am – 7pm IST
              <br />
              Sat: 11am – 5pm IST
              <br />
              Sun: Closed
            </p>
          </div>
        </div>

        <div>
          <div
            style={{
              height: 280,
              background: 'linear-gradient(135deg, rgba(200,169,102,0.06), rgba(200,169,102,0.02))',
              border: '1px solid rgba(200,169,102,0.15)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 32,
            }}
          >
            <span style={{ fontSize: 32, opacity: 0.4, marginBottom: 12 }}>📍</span>
            <p style={{ fontSize: 11, color: 'rgba(200,169,102,0.45)' }}>Interactive map coming soon</p>
          </div>

          <div
            style={{
              padding: 24,
              background: 'rgba(200,169,102,0.05)',
              border: '1px solid rgba(200,169,102,0.12)',
            }}
          >
            <p style={{ fontSize: 10, letterSpacing: '0.14em', marginBottom: 8, textTransform: 'uppercase' }}>Stay Updated</p>
            <p style={{ fontSize: 10, color: 'rgba(232,228,220,0.4)', lineHeight: 1.6, marginBottom: 14 }}>
              Subscribe for new collections and exclusive offers.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '10px 12px',
                marginBottom: 8,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(200,169,102,0.25)',
                color: '#E8E4DC',
                fontSize: 12,
              }}
            />
            <button
              type="button"
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'rgba(200,169,102,0.15)',
                border: '1px solid rgba(200,169,102,0.35)',
                color: '#C8A966',
                fontSize: 10,
                letterSpacing: '0.14em',
                cursor: 'pointer',
              }}
            >
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
