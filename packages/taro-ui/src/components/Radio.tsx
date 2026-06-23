import React, { useState } from 'react';
import { Text, View } from '@tarojs/components';
import { cx } from './utils';
import './styles.css';

export type RadioSize = 'small' | 'middle' | 'large';
export type RadioValue = string | number;

export interface RadioOption {
  label: React.ReactNode;
  value: RadioValue;
  disabled?: boolean;
}

export interface RadioProps {
  value?: RadioValue;
  defaultValue?: RadioValue;
  options: RadioOption[];
  size?: RadioSize;
  disabled?: boolean;
  direction?: 'horizontal' | 'vertical';
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: RadioValue) => void;
}

export const Radio: React.FC<RadioProps> = ({
  value,
  defaultValue,
  options,
  size = 'middle',
  disabled = false,
  direction = 'horizontal',
  className,
  style,
  onChange
}) => {
  const [innerValue, setInnerValue] = useState<RadioValue | undefined>(defaultValue);
  const controlled = value !== undefined;
  const checkedValue = controlled ? value : innerValue;

  const selectValue = (nextValue: RadioValue, optionDisabled?: boolean) => {
    if (disabled || optionDisabled) return;
    if (!controlled) setInnerValue(nextValue);
    onChange?.(nextValue);
  };

  return (
    <View
      className={cx('ai-choice-group', `ai-choice-${direction}`, disabled && 'ai-choice-group-disabled', className)}
      style={style}
    >
      {options.map((option) => {
        const checked = checkedValue === option.value;
        const optionDisabled = disabled || option.disabled;
        return (
          <View
            key={String(option.value)}
            className={cx(
              'ai-choice-item',
              'ai-radio-item',
              `ai-choice-${size}`,
              checked && 'ai-choice-checked',
              optionDisabled && 'ai-choice-disabled'
            )}
            onClick={() => selectValue(option.value, option.disabled)}
          >
            <View className="ai-choice-box">
              <View className="ai-choice-splash" />
              <View className="ai-choice-check" />
            </View>
            <Text className="ai-choice-label">{option.label}</Text>
          </View>
        );
      })}
    </View>
  );
};

Radio.displayName = 'Radio';
