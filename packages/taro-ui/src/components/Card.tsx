import React from 'react';
import { View } from '@tarojs/components';
import { cx } from './utils';
import './styles.css';

export type CardType = 'default' | 'dashed';
export type CardColor =
  | 'default'
  | 'app-pink'
  | 'purple'
  | 'app-blue'
  | 'app-yellow'
  | 'app-orange'
  | 'app-teal'
  | 'app-green'
  | 'app-red'
  | 'lime-green'
  | 'yellow-green'
  | 'brown'
  | 'warm-peach-pink';
export type CardPattern = 'none' | CardColor;

export interface CardProps {
  type?: CardType;
  color?: CardColor;
  pattern?: CardPattern;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: unknown) => void;
}

export const Card: React.FC<CardProps> = ({
  type = 'default',
  color = 'default',
  pattern = 'none',
  children,
  className,
  style,
  onClick
}) => {
  const cls = cx(
    'ai-card',
    type === 'dashed' && 'ai-card-dashed',
    color !== 'default' && `ai-card-${color}`,
    pattern !== 'none' && `ai-pattern-${pattern}`,
    className
  );

  return (
    <View className={cls} style={style} onClick={onClick}>
      {children}
    </View>
  );
};

Card.displayName = 'Card';
