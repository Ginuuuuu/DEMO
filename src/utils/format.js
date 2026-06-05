export function formatPrice(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function stockLabel(stock) {
  if (stock <= 3) return `Only ${stock} left`;
  if (stock <= 8) return `${stock} remaining`;
  return `${stock} in stock`;
}

export function stockColor(stock) {
  if (stock <= 3) return '#e85d3a';
  if (stock <= 8) return '#e8a83a';
  return '#5eaa7a';
}
