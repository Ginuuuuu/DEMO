const SVG_TEMPLATES = {
  pants: (color) => `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="10" width="60" height="50" fill="${color}"/><circle cx="35" cy="60" r="8" fill="${color}"/><circle cx="65" cy="60" r="8" fill="${color}"/><rect x="28" y="68" width="10" height="40" fill="${color}"/><rect x="62" y="68" width="10" height="40" fill="${color}"/></svg>`,
  trousers: (color) => `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="10" width="60" height="55" fill="${color}"/><rect x="27" y="73" width="12" height="45" fill="${color}"/><rect x="61" y="73" width="12" height="45" fill="${color}"/></svg>`,
  joggers: (color) => `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="10" width="60" height="50" fill="${color}"/><path d="M 30 68 Q 28 100 32 130" stroke="${color}" stroke-width="10" fill="none"/><path d="M 70 68 Q 72 100 68 130" stroke="${color}" stroke-width="10" fill="none"/></svg>`,
  shorts: (color) => `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="10" width="60" height="50" fill="${color}"/><rect x="28" y="68" width="12" height="35" fill="${color}"/><rect x="60" y="68" width="12" height="35" fill="${color}"/></svg>`,
  tshirt: (color) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg"><rect x="25" y="15" width="50" height="55" fill="${color}"/><rect x="15" y="35" width="15" height="30" fill="${color}"/><rect x="70" y="35" width="15" height="30" fill="${color}"/></svg>`,
  shirt: (color) => `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg"><rect x="25" y="15" width="50" height="60" fill="${color}"/><rect x="10" y="35" width="20" height="40" fill="${color}"/><rect x="70" y="35" width="20" height="40" fill="${color}"/></svg>`,
  shoe: (color) => `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="50" rx="28" ry="15" fill="${color}"/><path d="M 25 45 Q 35 28 50 35 L 75 45" stroke="${color}" stroke-width="8" fill="none"/></svg>`,
  boot: (color) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="35" width="40" height="45" rx="4" fill="${color}"/><rect x="25" y="75" width="50" height="12" fill="#333"/></svg>`,
  sandal: (color) => `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="40" rx="35" ry="10" fill="${color}"/><rect x="45" y="15" width="10" height="25" fill="${color}"/></svg>`,
  belt: (color) => `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="20" width="80" height="20" fill="${color}" rx="2"/></svg>`,
  tie: (color) => `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg"><path d="M 42 10 L 50 90 L 58 10 Z" fill="${color}"/></svg>`,
  watch: (color) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="22" fill="${color}" stroke="#c8a966" stroke-width="2"/><rect x="10" y="46" width="18" height="8" fill="${color}"/><rect x="72" y="46" width="18" height="8" fill="${color}"/></svg>`,
  cap: (color) => `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="35" rx="30" ry="22" fill="${color}"/><rect x="20" y="50" width="60" height="8" fill="${color}"/></svg>`,
  perfume: (color) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg"><rect x="35" y="30" width="30" height="65" fill="${color}" opacity="0.85"/><rect x="42" y="15" width="16" height="18" fill="#c8a966"/></svg>`,
  ring: (color) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="55" r="20" fill="none" stroke="${color}" stroke-width="8"/><circle cx="50" cy="35" r="8" fill="#c8a966"/></svg>`,
  chain: (color) => `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg"><ellipse cx="25" cy="30" rx="12" ry="8" fill="none" stroke="${color}" stroke-width="3"/><ellipse cx="50" cy="30" rx="12" ry="8" fill="none" stroke="${color}" stroke-width="3"/><ellipse cx="75" cy="30" rx="12" ry="8" fill="none" stroke="${color}" stroke-width="3"/></svg>`,
  bracelet: (color) => `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="22" width="70" height="16" rx="8" fill="${color}"/></svg>`,
  stud: (color) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="12" fill="${color}"/><circle cx="50" cy="50" r="6" fill="#c8a966"/></svg>`,
  underwear: (color) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 25 20 L 75 20 L 70 70 Q 50 85 30 70 Z" fill="${color}"/></svg>`,
  accessory: (color) => `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="20" rx="10" fill="${color}"/></svg>`,
};

export function generateProductSVG(type, color) {
  const fn = SVG_TEMPLATES[type] ?? SVG_TEMPLATES.tshirt;
  return fn(color);
}

/** Gradient placeholder for hero/carousel when no photo exists */
export function productPlaceholderStyle(color, accent) {
  return {
    background: `radial-gradient(ellipse 80% 70% at 50% 40%, ${color}33 0%, ${accent}11 45%, #060606 100%)`,
    border: '1px solid rgba(255,255,255,0.06)',
  };
}
