import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LogoSplash({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #060606 0%, #121212 50%, #060606 100%)',
        position: 'fixed',
        inset: 0,
        zIndex: 999,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          fontSize: 'clamp(48px, 12vw, 110px)',
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontStyle: 'italic',
          color: '#E8E4DC',
          letterSpacing: '0.18em',
          textShadow: '0 0 60px rgba(200,169,102,0.35)',
        }}
      >
        ELEGANCE
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{
          marginTop: 20,
          fontSize: 11,
          letterSpacing: '0.4em',
          color: 'rgba(200,169,102,0.65)',
          fontWeight: 300,
          textTransform: 'uppercase',
        }}
      >
        Premium Menswear
      </motion.p>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        style={{
          marginTop: 36,
          width: 80,
          height: 1,
          background: 'linear-gradient(90deg, transparent, #c8a966, transparent)',
          transformOrigin: 'center',
        }}
      />
    </motion.div>
  );
}
