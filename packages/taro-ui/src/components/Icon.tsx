import React from 'react';
import { Image, View } from '@tarojs/components';
import { iconColorMap, iconList, type AnimalIconName } from '@animal-island-ui/core';
import { cx, toSize } from './utils';
import './styles.css';

export type IconName = AnimalIconName;

export interface IconProps {
  name?: IconName;
  src?: string;
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
  bounce?: boolean;
}

export const ICON_LIST = iconList;

export const Icon: React.FC<IconProps> = ({ name, src, size = 24, className, style, bounce = false }) => {
  const normalizedSize = toSize(size);
  const cls = cx('ai-icon', name && `ai-icon-${name}`, bounce && 'ai-icon-bounce', className);
  const mergedStyle = {
    width: normalizedSize,
    height: normalizedSize,
    backgroundColor: name ? iconColorMap[name] : undefined,
    ...style
  } as React.CSSProperties;

  if (src) {
    return <Image className={cls} style={mergedStyle} src={src} mode="aspectFit" />;
  }

  return <View className={cls} style={mergedStyle} />;
};

Icon.displayName = 'Icon';
