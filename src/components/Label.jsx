export default function Label({ children }) {
  return (
    <p
      style={{
        fontSize: 'clamp(7px, 1.5vw, 8.5px)',
        letterSpacing: '0.32em',
        color: 'rgba(232,228,220,0.26)',
        marginBottom: 9,
        fontWeight: 300,
        textTransform: 'uppercase',
      }}
    >
      {children}
    </p>
  );
}
