import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { count } = useCart();
  const location = useLocation();

  const crumbs = [];
  const parts = location.pathname.split('/').filter(Boolean);
  if (parts.length === 0) crumbs.push('Home');
  else {
    crumbs.push('Home');
    if (parts[0] === 'contact') crumbs.push('Contact');
    else if (parts[0] === 'shop') {
      crumbs.push(parts[1]?.replace(/_/g, ' ') ?? 'Shop');
      if (parts[2]) crumbs.push('Product');
    }
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        height: 64,
        background: 'rgba(5,5,5,0.94)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 clamp(16px, 4vw, 40px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Link
        to="/"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(18px, 4vw, 22px)',
          fontWeight: 600,
          letterSpacing: '0.16em',
          color: '#E8E4DC',
        }}
      >
        ELEGANCE
      </Link>

      <div
        style={{
          display: 'none',
          alignItems: 'center',
          gap: 8,
          fontSize: 10,
          letterSpacing: '0.1em',
          color: 'rgba(232,228,220,0.35)',
          textTransform: 'uppercase',
        }}
        className="nav-crumbs"
      >
        {crumbs.map((c, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {i > 0 && <span style={{ color: 'rgba(200,169,102,0.35)' }}>›</span>}
            <span style={{ color: i === crumbs.length - 1 ? 'rgba(200,169,102,0.85)' : 'inherit' }}>{c}</span>
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 3vw, 24px)' }}>
        <Link
          to="/contact"
          style={{
            fontSize: 10,
            letterSpacing: '0.14em',
            color: location.pathname === '/contact' ? '#C8A966' : 'rgba(232,228,220,0.45)',
            fontWeight: 400,
            transition: 'color 0.2s',
          }}
        >
          CONTACT
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'rgba(232,228,220,0.5)' }}>
          <span style={{ opacity: 0.6 }}>BAG</span>
          <span
            style={{
              minWidth: 22,
              height: 22,
              borderRadius: '50%',
              border: '1px solid rgba(200,169,102,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              color: '#C8A966',
            }}
          >
            {count}
          </span>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .nav-crumbs { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
