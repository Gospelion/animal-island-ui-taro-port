import React, { useState } from 'react';
import { Text, View } from '@tarojs/components';
import { cx } from './utils';
import './styles.css';

export type SwitchSize = 'small' | 'default';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  size?: SwitchSize;
  disabled?: boolean;
  loading?: boolean;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (checked: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  size = 'default',
  disabled = false,
  loading = false,
  checkedChildren,
  unCheckedChildren,
  className,
  style,
  onChange
}) => {
  const [innerChecked, setInnerChecked] = useState(defaultChecked);
  const controlled = checked !== undefined;
  const currentChecked = controlled ? checked : innerChecked;
  const inactive = disabled || loading;

  const cls = cx(
    'ai-switch',
    `ai-switch-${size}`,
    currentChecked && 'ai-switch-checked',
    disabled && 'ai-switch-disabled',
    loading && 'ai-switch-loading',
    className
  );

  return (
    <View
      className={cls}
      style={style}
      onClick={() => {
        if (inactive) return;
        const nextChecked = !currentChecked;
        if (!controlled) setInnerChecked(nextChecked);
        onChange?.(nextChecked);
      }}
    >
      <View className="ai-switch-handle">{loading ? <View className="ai-switch-spinner" /> : null}</View>
      <Text className="ai-switch-inner">{currentChecked ? checkedChildren : unCheckedChildren}</Text>
    </View>
  );
};

Switch.displayName = 'Switch';
