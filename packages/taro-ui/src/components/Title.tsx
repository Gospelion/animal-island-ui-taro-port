import React from 'react';
import { Text, View } from '@tarojs/components';
import { cx } from './utils';
import type { CardColor } from './Card';
import './styles.css';

export type TitleSize = 'small' | 'middle' | 'large';
export type TitleColor = CardColor;

export interface TitleProps {
  size?: TitleSize;
  color?: TitleColor;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Title: React.FC<TitleProps> = ({ size = 'middle', color = 'default', children, className, style }) => {
  return (
    <View className={cx('ai-title', `ai-title-${size}`, color !== 'default' && `ai-title-${color}`, className)} style={style}>
      <View className="ai-title-back ai-title-back-left" />
      <View className="ai-title-back ai-title-back-right" />
      <View className="ai-title-fold ai-title-fold-left" />
      <View className="ai-title-fold ai-title-fold-right" />
      <View className="ai-title-front" />
      <Text className="ai-title-text">{children}</Text>
    </View>
  );
};

Title.displayName = 'Title';
