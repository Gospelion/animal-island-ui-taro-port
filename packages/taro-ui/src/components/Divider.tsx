import React from 'react';
import { View } from '@tarojs/components';
import { cx } from './utils';
import './styles.css';

export type DividerType =
  | 'line-brown'
  | 'line-teal'
  | 'line-white'
  | 'line-yellow'
  | 'wave-yellow'
  | 'dashed-brown'
  | 'dashed-teal'
  | 'dashed-white'
  | 'dashed-yellow';

export interface DividerProps {
  type?: DividerType;
  className?: string;
  style?: React.CSSProperties;
}

export const Divider: React.FC<DividerProps> = ({ type = 'line-brown', className, style }) => {
  return <View className={cx('ai-divider', `ai-divider-${type}`, className)} style={style} />;
};

Divider.displayName = 'Divider';
