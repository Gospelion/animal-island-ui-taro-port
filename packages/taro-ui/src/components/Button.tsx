import React from 'react';
import { Button as TaroButton, Text, View } from '@tarojs/components';
import { cx } from './utils';
import './styles.css';

export type ButtonType = 'primary' | 'default' | 'dashed' | 'text' | 'link';
export type ButtonSize = 'small' | 'middle' | 'large';
export type ButtonHTMLType = 'submit' | 'reset' | 'button';

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  danger?: boolean;
  ghost?: boolean;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  htmlType?: ButtonHTMLType;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: unknown) => void;
}

export const Button: React.FC<ButtonProps> = ({
  type = 'default',
  size = 'middle',
  danger = false,
  ghost = false,
  block = false,
  loading = false,
  disabled = false,
  icon,
  htmlType = 'button',
  children,
  className,
  style,
  onClick
}) => {
  const inactive = disabled || loading;
  const cls = cx(
    'ai-btn',
    `ai-btn-${type}`,
    `ai-btn-${size}`,
    danger && 'ai-btn-danger',
    ghost && 'ai-btn-ghost',
    block && 'ai-btn-block',
    loading && 'ai-btn-loading',
    inactive && 'ai-btn-disabled',
    className
  );

  return (
    <TaroButton
      formType={htmlType === 'submit' ? 'submit' : htmlType === 'reset' ? 'reset' : undefined}
      className={cls}
      style={style}
      disabled={disabled}
      loading={false}
      onClick={(event) => {
        if (!inactive) onClick?.(event);
      }}
    >
      {icon && !loading ? <View className="ai-btn-icon">{icon}</View> : null}
      {children ? <Text className="ai-btn-text">{children}</Text> : null}
    </TaroButton>
  );
};

Button.displayName = 'Button';
