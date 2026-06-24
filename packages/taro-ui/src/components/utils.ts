import Taro from '@tarojs/taro';

export function cx(...items: Array<string | false | null | undefined>): string {
  return items.filter(Boolean).join(' ');
}

export function toSize(value: number | string): string {
  if (typeof value === 'number') return `${value}px`;

  return value.replace(/(-?\d*\.?\d+)rpx/g, (_, size: string) => {
    try {
      return Taro.pxTransform(Number(size));
    } catch {
      return `${size}rpx`;
    }
  });
}
