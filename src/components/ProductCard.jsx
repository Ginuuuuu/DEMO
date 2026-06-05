import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatPrice, stockColor, stockLabel } from '../utils/format';
import { generateProductSVG } from '../utils/productSvg';

export default function ProductCard({ product, accent }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
      <Link
        to={`/shop/${product.categoryId}/${product.id}`}
        style={{
          display: 'block',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          overflow: 'hidden',
          transition: 'border-color 0.25s',
        }}
      >
        <div
          style={{
            aspectRatio: '4/5',
            background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${product.color}18 0%, transparent 70%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <div
            style={{ width: '70%', height: '70%', opacity: 0.9 }}
            dangerouslySetInnerHTML={{ __html: generateProductSVG(product.type, product.color) }}
          />
        </div>
        <div style={{ padding: '16px 18px 20px' }}>
          <p style={{ fontSize: 8, letterSpacing: '0.2em', color: 'rgba(200,169,102,0.45)', marginBottom: 6 }}>
            {product.sectionLabel?.toUpperCase()}
          </p>
          <h4
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 17,
              fontWeight: 500,
              marginBottom: 8,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {product.name}
          </h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'rgba(232,228,220,0.55)' }}>{formatPrice(product.price)}</span>
            <span style={{ fontSize: 8, color: stockColor(product.stock), letterSpacing: '0.06em' }}>
              {stockLabel(product.stock).toUpperCase()}
            </span>
          </div>
          <p
            style={{
              marginTop: 12,
              fontSize: 9,
              letterSpacing: '0.18em',
              color: accent ?? '#C8A966',
              opacity: 0.75,
            }}
          >
            EXPLORE 3D →
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
