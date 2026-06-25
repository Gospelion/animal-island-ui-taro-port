import React, { useState } from 'react';
import { Input as TaroInput, Text, View } from '@tarojs/components';
import { cx } from './utils';
import './styles.css';

export type InputSize = 'small' | 'middle' | 'large';
export type InputStatus = 'error' | 'warning';

export interface InputChangePayload {
  value: string;
  event: unknown;
}

export interface InputProps {
  size?: InputSize;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?: boolean;
  status?: InputStatus;
  shadow?: boolean;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (payload: InputChangePayload) => void;
  onClear?: () => void;
}

export const Input: React.FC<InputProps> = ({
  size = 'middle',
  prefix,
  suffix,
  allowClear = false,
  status,
  shadow = false,
  disabled = false,
  value,
  defaultValue = '',
  placeholder,
  className,
  style,
  onChange,
  onClear
}) => {
  const [innerValue, setInnerValue] = useState(defaultValue);
  const controlled = value !== undefined;
  const currentValue = controlled ? value : innerValue;

  const cls = cx(
    'ai-input-wrap',
    `ai-input-${size}`,
    status && `ai-input-${status}`,
    disabled && 'ai-input-disabled',
    !shadow && 'ai-input-no-shadow',
    className
  );

  const emitChange = (nextValue: string, event: unknown) => {
    if (!controlled) setInnerValue(nextValue);
    onChange?.({ value: nextValue, event });
  };

  return (
    <View className={cls} style={style}>
      {prefix ? <View className="ai-input-affix">{prefix}</View> : null}
      <TaroInput
        className="ai-input-control"
        disabled={disabled}
        value={currentValue}
        placeholder={placeholder}
        placeholderClass="ai-input-placeholder"
        placeholderStyle="color:#c4b89e;font-weight:400;"
        placeholderTextColor="#c4b89e"
        onInput={(event) => {
          const nextValue = String((event as { detail?: { value?: unknown } }).detail?.value ?? '');
          emitChange(nextValue, event);
        }}
      />
      {allowClear && currentValue && !disabled ? (
        <Text
          className="ai-input-clear"
          onClick={() => {
            emitChange('', { type: 'clear' });
            onClear?.();
          }}
        >
          ×
        </Text>
      ) : null}
      {suffix ? <View className="ai-input-affix">{suffix}</View> : null}
    </View>
  );
};

Input.displayName = 'Input';
