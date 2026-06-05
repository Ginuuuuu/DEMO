import { Link } from 'react-router-dom';
import { CATEGORIES, categoryUrl } from '../data/catalog';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: 'clamp(40px, 8vw, 64px) clamp(20px, 5vw, 48px) clamp(32px, 6vw, 48px)',
        marginTop: 'auto',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 32,
            marginBottom: 40,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 24,
                letterSpacing: '0.12em',
                marginBottom: 12,
              }}
            >
              ELEGANCE
            </p>
            <p style={{ fontSize: 11, color: 'rgba(232,228,220,0.35)', lineHeight: 1.7, maxWidth: 260 }}>
              Premium menswear with immersive 3D previews. Crafted for the modern gentleman.
            </p>
          </div>
          <div>
            <p style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(200,169,102,0.5)', marginBottom: 16 }}>SHOP</p>
            {Object.values(CATEGORIES).map((cat) => (
              <Link
                key={cat.id}
                to={categoryUrl(cat.id)}
                style={{
                  display: 'block',
                  fontSize: 11,
                  color: 'rgba(232,228,220,0.4)',
                  marginBottom: 8,
                  transition: 'color 0.2s',
                }}
              >
                {cat.label}
              </Link>
            ))}
          </div>
          <div>
            <p style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(200,169,102,0.5)', marginBottom: 16 }}>SUPPORT</p>
            <Link to="/contact" style={{ display: 'block', fontSize: 11, color: 'rgba(232,228,220,0.4)', marginBottom: 8 }}>
              Contact Us
            </Link>
            <p style={{ fontSize: 11, color: 'rgba(232,228,220,0.4)', marginBottom: 8 }}>Shipping & Returns</p>
            <p style={{ fontSize: 11, color: 'rgba(232,228,220,0.4)' }}>Size Guide</p>
          </div>
        </div>
        <p style={{ fontSize: 10, color: 'rgba(232,228,220,0.2)', letterSpacing: '0.08em', textAlign: 'center' }}>
          © {new Date().getFullYear()} ELEGANCE — ENOMOTIA. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
