import React from 'react';
import { Text, View } from '@tarojs/components';
import { Button } from './Button';
import { cx } from './utils';
import './styles.css';

export interface ModalProps {
  open: boolean;
  title?: React.ReactNode;
  width?: number | string;
  maskClosable?: boolean;
  footer?: React.ReactNode | null;
  onClose?: () => void;
  onOk?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  title,
  width = '640rpx',
  maskClosable = true,
  footer,
  onClose,
  onOk,
  children,
  className,
  style,
  maskStyle
}) => {
  if (!open) return null;

  const modalStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    ...style
  } as React.CSSProperties;

  return (
    <View
      className="ai-modal-mask"
      style={maskStyle}
      onClick={() => {
        if (maskClosable) onClose?.();
      }}
    >
      <View
        className={cx('ai-modal', className)}
        style={modalStyle}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {title ? <View className="ai-modal-title">{title}</View> : null}
        <View className="ai-modal-body">{children}</View>
        {footer !== null ? (
          <View className="ai-modal-footer">
            {footer === undefined ? (
              <>
                <Button type="default" onClick={onClose}>
                  <Text>取消</Text>
                </Button>
                <Button type="primary" onClick={onOk}>
                  <Text>确定</Text>
                </Button>
              </>
            ) : (
              footer
            )}
          </View>
        ) : null}
      </View>
    </View>
  );
};

Modal.displayName = 'Modal';
