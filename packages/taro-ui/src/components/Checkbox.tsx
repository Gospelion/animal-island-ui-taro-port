import React, { useState } from 'react';
import { Text, View } from '@tarojs/components';
import { cx } from './utils';
import './styles.css';

export type CheckboxSize = 'small' | 'middle' | 'large';
export type CheckboxValue = string | number;

export interface CheckboxOption {
  label: React.ReactNode;
  value: CheckboxValue;
  disabled?: boolean;
}

export interface CheckboxProps {
  value?: CheckboxValue[];
  defaultValue?: CheckboxValue[];
  options: CheckboxOption[];
  size?: CheckboxSize;
  disabled?: boolean;
  direction?: 'horizontal' | 'vertical';
  className?: string;
  style?: React.CSSProperties;
  onChange?: (values: CheckboxValue[]) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  value,
  defaultValue = [],
  options,
  size = 'middle',
  disabled = false,
  direction = 'horizontal',
  className,
  style,
  onChange
}) => {
  const [innerValue, setInnerValue] = useState<CheckboxValue[]>(defaultValue);
  const controlled = value !== undefined;
  const checkedValues = controlled ? value : innerValue;

  const toggleValue = (nextValue: CheckboxValue, optionDisabled?: boolean) => {
    if (disabled || optionDisabled) return;
    const nextValues = checkedValues.includes(nextValue)
      ? checkedValues.filter((item) => item !== nextValue)
      : [...checkedValues, nextValue];
    if (!controlled) setInnerValue(nextValues);
    onChange?.(nextValues);
  };

  return (
    <View
      className={cx('ai-choice-group', `ai-choice-${direction}`, disabled && 'ai-choice-group-disabled', className)}
      style={style}
    >
      {options.map((option) => {
        const checked = checkedValues.includes(option.value);
        const optionDisabled = disabled || option.disabled;
        return (
          <View
            key={String(option.value)}
            className={cx(
              'ai-choice-item',
              'ai-checkbox-item',
              `ai-choice-${size}`,
              checked && 'ai-choice-checked',
              optionDisabled && 'ai-choice-disabled'
            )}
            onClick={() => toggleValue(option.value, option.disabled)}
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

Checkbox.displayName = 'Checkbox';
