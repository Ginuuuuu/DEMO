import { Link, useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { getCategory } from '../data/catalog';
import ProductCard from '../components/ProductCard';
import 'swiper/css';
import 'swiper/css/free-mode';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = getCategory(categoryId);

  if (!category) {
    return (
      <div style={{ padding: 80, textAlign: 'center' }}>
        <p style={{ marginBottom: 16 }}>Category not found.</p>
        <Link to="/" style={{ color: '#C8A966' }}>
          Return home
        </Link>
      </div>
    );
  }

  const sections = Object.values(category.sections);
  const sectionParam = searchParams.get('section');
  const activeSection =
    (sectionParam && category.sections[sectionParam]) || sections[0];

  const selectSection = (sectionId) => {
    setSearchParams({ section: sectionId }, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sectionProducts = activeSection.items.map((item) => ({
    ...item,
    categoryId: category.id,
    categoryLabel: category.label,
    sectionId: activeSection.id,
    sectionLabel: activeSection.label,
    accent: category.accent,
  }));

  return (
    <div>
      <section
        style={{
          minHeight: 'clamp(200px, 32vh, 300px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background: `radial-gradient(ellipse 55% 80% at 50% 50%, ${category.accent}12 0%, transparent 72%)`,
          padding: 'clamp(24px, 5vw, 48px)',
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: 10,
            letterSpacing: '0.32em',
            color: 'rgba(200,169,102,0.45)',
            marginBottom: 20,
          }}
        >
          ← HOME
        </Link>
        <motion.h1
          key={activeSection.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(36px, 8vw, 64px)',
            fontWeight: 300,
            fontStyle: 'italic',
            marginBottom: 8,
            textAlign: 'center',
          }}
        >
          {activeSection.label}
        </motion.h1>
        <p
          style={{
            fontSize: 11,
            color: 'rgba(232,228,220,0.38)',
            letterSpacing: '0.08em',
            textAlign: 'center',
            maxWidth: 520,
            lineHeight: 1.65,
          }}
        >
          {activeSection.desc}
        </p>
        <p style={{ fontSize: 9, color: 'rgba(200,169,102,0.45)', letterSpacing: '0.2em', marginTop: 14 }}>
          {category.label.toUpperCase()} · {sectionProducts.length} STYLES
        </p>
      </section>

      <section style={{ padding: 'clamp(24px, 5vw, 40px) clamp(16px, 4vw, 48px)', maxWidth: 1400, margin: '0 auto' }}>
        <p
          style={{
            fontSize: 9,
            letterSpacing: '0.34em',
            color: 'rgba(200,169,102,0.45)',
            marginBottom: 16,
            textTransform: 'uppercase',
          }}
        >
          Select Section
        </p>

        <Swiper modules={[FreeMode]} freeMode spaceBetween={8} slidesPerView="auto" style={{ marginBottom: 36 }}>
          {sections.map((sec) => {
            const isActive = sec.id === activeSection.id;
            return (
              <SwiperSlide key={sec.id} style={{ width: 'auto' }}>
                <button
                  type="button"
                  onClick={() => selectSection(sec.id)}
                  style={{
                    display: 'block',
                    padding: '10px 18px',
                    border: isActive ? `1px solid ${category.accent}` : '1px solid rgba(255,255,255,0.08)',
                    background: isActive ? `${category.accent}18` : 'rgba(255,255,255,0.02)',
                    fontSize: 10,
                    letterSpacing: '0.12em',
                    whiteSpace: 'nowrap',
                    color: isActive ? category.accent : 'rgba(232,228,220,0.55)',
                    cursor: 'pointer',
                    transition: 'all 0.22s',
                    fontFamily: 'inherit',
                  }}
                >
                  {sec.label.toUpperCase()}
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))',
                gap: 12,
              }}
            >
              {sectionProducts.map((product) => (
                <ProductCard key={product.id} product={product} accent={category.accent} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}
