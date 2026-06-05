import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { formatPrice } from '../utils/format';
import { productPlaceholderStyle } from '../utils/productSvg';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function FeaturedCarousel({ products }) {
  if (!products.length) return null;

  return (
    <section style={{ padding: '0 clamp(16px, 4vw, 48px)', maxWidth: 1400, margin: '0 auto' }}>
      <p
        style={{
          fontSize: 9,
          letterSpacing: '0.38em',
          color: 'rgba(200,169,102,0.5)',
          marginBottom: 24,
          fontWeight: 500,
          textTransform: 'uppercase',
        }}
      >
        Featured Collection
      </p>

      <Swiper
        className="featured-swiper"
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        navigation
        pagination={{ clickable: true }}
        loop={products.length > 1}
        speed={600}
        style={{ borderRadius: 2, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                minHeight: 'clamp(320px, 50vh, 420px)',
                ...productPlaceholderStyle(product.color, product.accent ?? '#c8a966'),
              }}
            >
              <div
                style={{
                  padding: 'clamp(28px, 5vw, 48px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <p style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(200,169,102,0.6)', marginBottom: 12 }}>
                  {product.categoryLabel?.toUpperCase()} · {product.sectionLabel?.toUpperCase()}
                </p>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(28px, 5vw, 42px)',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    marginBottom: 12,
                    lineHeight: 1.15,
                  }}
                >
                  {product.name}
                </h3>
                <p style={{ fontSize: 12, color: 'rgba(232,228,220,0.45)', lineHeight: 1.7, marginBottom: 24, maxWidth: 400 }}>
                  {product.desc}
                </p>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(22px, 4vw, 28px)',
                    marginBottom: 24,
                  }}
                >
                  {formatPrice(product.price)}
                </p>
                <Link
                  to={`/shop/${product.categoryId}/${product.id}`}
                  style={{
                    alignSelf: 'flex-start',
                    padding: '12px 28px',
                    border: '1px solid rgba(200,169,102,0.5)',
                    color: '#C8A966',
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    transition: 'all 0.25s',
                  }}
                >
                  VIEW IN 3D
                </Link>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 32,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: 'clamp(120px, 30vw, 180px)',
                    height: 'clamp(120px, 30vw, 180px)',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${product.color}55 0%, transparent 70%)`,
                    position: 'absolute',
                  }}
                />
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: product.color,
                    boxShadow: `0 0 40px ${product.color}88`,
                    border: '2px solid rgba(255,255,255,0.15)',
                  }}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
