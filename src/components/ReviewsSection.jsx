import { motion } from 'framer-motion';

const REVIEWS = [
  { name: 'James Mitchell', comment: 'Exceptional quality. The 3D viewer really helps in choosing the perfect fit.' },
  { name: 'Alexander Chen', comment: 'Premium materials and outstanding customer service. Highly recommend!' },
  { name: 'Marcus Thompson', comment: 'The attention to detail is remarkable. Worth every penny.' },
  { name: 'David Rodriguez', comment: 'Best menswear shopping experience. Fast delivery too!' },
];

export default function ReviewsSection() {
  return (
    <section style={{ padding: 'clamp(48px, 10vw, 80px) clamp(16px, 4vw, 48px)', maxWidth: 1400, margin: '0 auto' }}>
      <p
        style={{
          fontSize: 9,
          letterSpacing: '0.38em',
          color: 'rgba(200,169,102,0.45)',
          marginBottom: 32,
          fontWeight: 500,
          textTransform: 'uppercase',
        }}
      >
        What Our Customers Say
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
        }}
      >
        {REVIEWS.map((review, i) => (
          <motion.div
            key={review.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: 'clamp(20px, 4vw, 28px)',
            }}
          >
            <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
              {[...Array(5)].map((_, j) => (
                <span key={j} style={{ color: '#C8A966', fontSize: 13 }}>
                  ★
                </span>
              ))}
            </div>
            <p style={{ fontSize: 12, color: 'rgba(232,228,220,0.65)', lineHeight: 1.75, marginBottom: 14 }}>
              "{review.comment}"
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, fontWeight: 500 }}>
              — {review.name}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
