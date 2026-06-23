export function formatAnimalNumber(value: number | string, thousandSeparator = true): string {
  const raw = typeof value === 'number' ? String(value) : value;
  if (!thousandSeparator) return raw;
  return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
