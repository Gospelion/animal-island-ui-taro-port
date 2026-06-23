import React, { useState } from 'react';
import { Text, View } from '@tarojs/components';
import { cx } from './utils';
import './styles.css';

export interface CollapseProps {
  question?: React.ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (expanded: boolean) => void;
}

export const Collapse: React.FC<CollapseProps> = ({
  question,
  expanded,
  defaultExpanded = false,
  disabled = false,
  children,
  className,
  style,
  onChange
}) => {
  const [innerExpanded, setInnerExpanded] = useState(defaultExpanded);
  const controlled = expanded !== undefined;
  const currentExpanded = controlled ? expanded : innerExpanded;

  const cls = cx(
    'ai-collapse',
    currentExpanded && 'ai-collapse-expanded',
    disabled && 'ai-collapse-disabled',
    className
  );

  const handleClick = () => {
    if (disabled) return;
    const nextExpanded = !currentExpanded;
    if (!controlled) setInnerExpanded(nextExpanded);
    onChange?.(nextExpanded);
  };

  return (
    <View className={cls} style={style}>
      <View className="ai-collapse-header" onClick={handleClick}>
        <Text className="ai-collapse-icon">{currentExpanded ? '-' : '+'}</Text>
        <View className="ai-collapse-question">{question}</View>
        <View className="ai-collapse-leaf" />
      </View>
      <View className="ai-collapse-panel">
        <View className="ai-collapse-content">{children}</View>
      </View>
    </View>
  );
};

Collapse.displayName = 'Collapse';
