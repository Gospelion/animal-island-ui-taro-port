export function cx(...items: Array<string | false | null | undefined>): string {
  return items.filter(Boolean).join(' ');
}

export function toSize(value: number | string): string {
  return typeof value === 'number' ? `${value}px` : value;
}
