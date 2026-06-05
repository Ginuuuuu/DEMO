import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORIES, getFeaturedProducts, categoryUrl } from '../data/catalog';
import FeaturedCarousel from '../components/FeaturedCarousel';
import ReviewsSection from '../components/ReviewsSection';

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 8);

  return (
    <div>
      <section
        style={{
          minHeight: 'clamp(70vh, 85vh, 92vh)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse 90% 70% at 50% 38%, rgba(200,169,102,0.06) 0%, transparent 68%)',
          padding: 'clamp(24px, 5vw, 48px)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '50% auto auto 50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(220px, 55vw, 520px)',
            height: 'clamp(220px, 55vw, 520px)',
            borderRadius: '50%',
            border: '1px solid rgba(200,169,102,0.06)',
            pointerEvents: 'none',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            fontSize: 10,
            letterSpacing: '0.45em',
            color: 'rgba(200,169,102,0.55)',
            marginBottom: 20,
            textTransform: 'uppercase',
          }}
        >
          Menswear Collection — 2025
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(36px, 8vw, 88px)',
            fontWeight: 300,
            fontStyle: 'italic',
            textAlign: 'center',
            lineHeight: 1.08,
            marginBottom: 16,
            maxWidth: 900,
          }}
        >
          Dressed in
          <br />
          Three Dimensions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: 12,
            color: 'rgba(232,228,220,0.38)',
            letterSpacing: '0.06em',
            marginBottom: 40,
            textAlign: 'center',
            maxWidth: 520,
          }}
        >
          Explore six curated collections with immersive 360° 3D previews
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}
        >
          {Object.values(CATEGORIES).map((cat) => (
            <Link
              key={cat.id}
              to={categoryUrl(cat.id)}
              style={{
                padding: '10px 22px',
                border: '1px solid rgba(232,228,220,0.14)',
                color: 'rgba(232,228,220,0.55)',
                fontSize: 9,
                letterSpacing: '0.22em',
                fontWeight: 500,
                transition: 'all 0.22s',
              }}
            >
              {cat.label.toUpperCase()}
            </Link>
          ))}
        </motion.div>
      </section>

      <div style={{ padding: 'clamp(48px, 8vw, 72px) 0' }}>
        <FeaturedCarousel products={featured} />
      </div>

      <section style={{ padding: 'clamp(40px, 8vw, 72px) clamp(16px, 4vw, 48px)', maxWidth: 1400, margin: '0 auto' }}>
        <p
          style={{
            fontSize: 9,
            letterSpacing: '0.38em',
            color: 'rgba(200,169,102,0.45)',
            marginBottom: 32,
            textTransform: 'uppercase',
          }}
        >
          Shop by Category
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: 2,
          }}
        >
          {Object.values(CATEGORIES).map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={categoryUrl(cat.id)}
                style={{
                  display: 'block',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  padding: 'clamp(28px, 5vw, 44px) clamp(20px, 4vw, 28px)',
                  transition: 'all 0.28s',
                }}
              >
                <div style={{ width: 28, height: 1, background: cat.accent, marginBottom: 20, opacity: 0.6 }} />
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(20px, 4vw, 26px)',
                    marginBottom: 8,
                  }}
                >
                  {cat.label}
                </h3>
                <p style={{ fontSize: 10, color: 'rgba(232,228,220,0.32)', lineHeight: 1.6, marginBottom: 18 }}>{cat.tag}</p>
                <p style={{ fontSize: 9, color: cat.accent, letterSpacing: '0.2em', opacity: 0.7 }}>
                  {Object.keys(cat.sections).length} SECTIONS →
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <ReviewsSection />
      </div>
    </div>
  );
}
