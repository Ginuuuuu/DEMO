import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { getProduct, getRelatedProducts, getSection, categoryUrl } from '../data/catalog';
import { useCart } from '../context/CartContext';
import ThreeDViewer from '../components/ThreeDViewer';
import Label from '../components/Label';
import ProductCard from '../components/ProductCard';
import { formatPrice, stockColor, stockLabel } from '../utils/format';
import 'swiper/css';
import 'swiper/css/free-mode';

export default function ProductPage() {
  const { categoryId, productId } = useParams();
  const product = getProduct(categoryId, productId);
  const { addItem } = useCart();
  const [size, setSize] = useState(null);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div style={{ padding: 80, textAlign: 'center' }}>
        <p style={{ marginBottom: 16 }}>Product not found.</p>
        <Link to="/" style={{ color: '#C8A966' }}>
          Return home
        </Link>
      </div>
    );
  }

  const sectionData = getSection(categoryId, product.sectionId);
  const sectionItems = sectionData?.section.items ?? [];
  const related = getRelatedProducts(categoryId, productId, 4);

  const handleAdd = () => {
    if (!size) return;
    addItem(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div style={{ background: '#060606' }}>
      <div
        style={{
          padding: '12px clamp(16px, 4vw, 40px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <Link to="/" style={{ fontSize: 10, color: 'rgba(232,228,220,0.35)', letterSpacing: '0.08em' }}>
          Home
        </Link>
        <span style={{ color: 'rgba(200,169,102,0.3)' }}>›</span>
        <Link
          to={categoryUrl(categoryId, product.sectionId)}
          style={{ fontSize: 10, color: 'rgba(232,228,220,0.35)', letterSpacing: '0.08em' }}
        >
          {product.sectionLabel}
        </Link>
        <span style={{ color: 'rgba(200,169,102,0.3)' }}>›</span>
        <span style={{ fontSize: 10, color: 'rgba(200,169,102,0.75)', letterSpacing: '0.1em' }}>{product.name}</span>
      </div>

      <div
        className="product-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          minHeight: 'calc(100vh - 120px)',
        }}
      >
        <div
          style={{
            position: 'relative',
            minHeight: 'clamp(360px, 55vh, 520px)',
            background: `radial-gradient(ellipse 70% 65% at 50% 44%, ${product.color}10 0%, transparent 65%)`,
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <ThreeDViewer key={`${product.id}-${product.type}`} product={product} type={product.type} />
          <div
            style={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 9,
              letterSpacing: '0.2em',
              color: 'rgba(232,228,220,0.2)',
              pointerEvents: 'none',
            }}
          >
            ↻ DRAG TO ROTATE 360°
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: 'clamp(24px, 5vw, 40px)',
            maxWidth: 560,
          }}
        >
          <Label>{product.sectionLabel}</Label>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(28px, 5vw, 36px)',
              fontWeight: 500,
              marginBottom: 12,
              lineHeight: 1.2,
            }}
          >
            {product.name}
          </h1>
          <p style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontFamily: "'Cormorant Garamond', serif", marginBottom: 20 }}>
            {formatPrice(product.price)}
          </p>
          <p style={{ fontSize: 12, color: 'rgba(232,228,220,0.5)', lineHeight: 1.75, marginBottom: 24 }}>{product.desc}</p>

          <Label>Material</Label>
          <p style={{ fontSize: 11, color: 'rgba(232,228,220,0.45)', marginBottom: 20 }}>{product.mat}</p>

          <Label>Availability</Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: stockColor(product.stock) }} />
            <span style={{ fontSize: 11, color: stockColor(product.stock) }}>{stockLabel(product.stock)}</span>
          </div>

          <Label>Size {!size && <span style={{ color: 'rgba(220,90,70,0.55)' }}> — SELECT</span>}</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            {product.sizes.map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => setSize(sz)}
                style={{
                  padding: '8px 14px',
                  border: size === sz ? `1px solid ${product.accent}` : '1px solid rgba(255,255,255,0.12)',
                  background: size === sz ? `${product.accent}18` : 'transparent',
                  color: size === sz ? product.accent : 'rgba(232,228,220,0.5)',
                  fontSize: 11,
                  cursor: 'pointer',
                }}
              >
                {sz}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!size}
            style={{
              width: '100%',
              padding: 14,
              marginBottom: 28,
              border: added ? '1px solid rgba(94,170,122,0.7)' : size ? `1px solid ${product.accent}` : '1px solid rgba(255,255,255,0.08)',
              background: added ? 'rgba(94,170,122,0.12)' : size ? `${product.accent}12` : 'rgba(255,255,255,0.02)',
              color: added ? '#5EAA7A' : size ? product.accent : 'rgba(232,228,220,0.2)',
              fontSize: 10,
              letterSpacing: '0.24em',
              cursor: size ? 'pointer' : 'not-allowed',
            }}
          >
            {added ? '✓ ADDED TO BAG' : 'ADD TO BAG'}
          </button>

          {sectionItems.length > 1 && (
            <>
              <Label>Colour Variants</Label>
              <Swiper modules={[FreeMode]} freeMode spaceBetween={8} slidesPerView="auto" style={{ marginBottom: 32 }}>
                {sectionItems.map((item) => (
                  <SwiperSlide key={item.id} style={{ width: 'auto' }}>
                    <Link
                      to={`/shop/${categoryId}/${item.id}`}
                      title={item.colorName}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '8px 12px',
                        border: item.id === product.id ? `1px solid ${product.accent}` : '1px solid rgba(255,255,255,0.08)',
                        background: item.id === product.id ? 'rgba(255,255,255,0.04)' : 'transparent',
                      }}
                    >
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          background: item.color,
                          border: '1px solid rgba(255,255,255,0.15)',
                        }}
                      />
                      <span style={{ fontSize: 10, color: 'rgba(232,228,220,0.5)' }}>{item.colorName}</span>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}

          <Link
            to={categoryUrl(categoryId, product.sectionId)}
            style={{
              display: 'inline-block',
              fontSize: 10,
              letterSpacing: '0.16em',
              color: 'rgba(200,169,102,0.6)',
            }}
          >
            ← BACK TO {product.sectionLabel?.toUpperCase()}
          </Link>
        </motion.div>
      </div>

      {related.length > 0 && (
        <section style={{ padding: 'clamp(40px, 8vw, 64px) clamp(16px, 4vw, 48px)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <p style={{ fontSize: 9, letterSpacing: '0.32em', color: 'rgba(200,169,102,0.45)', marginBottom: 24, textTransform: 'uppercase' }}>
              You May Also Like
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))',
                gap: 12,
              }}
            >
              {related.map((p) => (
                <ProductCard key={p.id} product={p} accent={product.accent} />
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @media (min-width: 900px) {
          .product-layout {
            grid-template-columns: 1.2fr 0.8fr !important;
            min-height: calc(100vh - 110px) !important;
          }
          .product-layout > div:first-child {
            border-bottom: none !important;
            border-right: 1px solid rgba(255,255,255,0.05);
            min-height: calc(100vh - 110px) !important;
          }
        }
      `}</style>
    </div>
  );
}
