import React from 'react';
import { ScrollView, Text, View } from '@tarojs/components';
import { cx } from './utils';
import './styles.css';

export type TableAlign = 'left' | 'center' | 'right';
export type TableRowKey<T extends Record<string, unknown> = Record<string, unknown>> =
  | keyof T
  | string
  | ((record: T, index: number) => string);

export interface TableColumn<T extends Record<string, unknown> = Record<string, unknown>> {
  title: React.ReactNode;
  dataIndex?: keyof T | string;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
  width?: number | string;
  align?: TableAlign;
  style?: React.CSSProperties;
}

export interface TableScroll {
  x?: number | string;
  y?: number | string;
}

export interface TableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  columns?: TableColumn<T>[];
  dataSource?: T[];
  rowKey?: TableRowKey<T>;
  striped?: boolean;
  showHeader?: boolean;
  loading?: boolean;
  emptyText?: React.ReactNode;
  scroll?: TableScroll;
  className?: string;
  style?: React.CSSProperties;
  onRowClick?: (record: T, index: number) => void;
}

function toDimension(value?: number | string): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${value}rpx` : value;
}

function getCellStyle<T extends Record<string, unknown>>(column: TableColumn<T>): React.CSSProperties {
  const width = toDimension(column.width);
  if (width) {
    return {
      width,
      flexBasis: width,
      flexGrow: 0,
      flexShrink: 0
    };
  }

  return {
    minWidth: 0
  };
}

function getTextAlign(align: TableAlign | undefined): React.CSSProperties['textAlign'] {
  return align || 'left';
}

export const Table = <T extends Record<string, unknown> = Record<string, unknown>>({
  columns = [],
  dataSource = [],
  rowKey = 'key',
  striped = true,
  showHeader = true,
  loading = false,
  emptyText = '暂无数据',
  scroll,
  className,
  style,
  onRowClick
}: TableProps<T>) => {
  const explicitWidthTotal = columns.reduce((total, column) => {
    return total + (typeof column.width === 'number' ? column.width : 0);
  }, 0);
  const scrollX = Boolean(scroll?.x || explicitWidthTotal > 0);
  const scrollY = Boolean(scroll?.y);
  const contentMinWidth = toDimension(scroll?.x) || (explicitWidthTotal > 0 ? `${explicitWidthTotal}rpx` : undefined);
  const contentStyle: React.CSSProperties = {
    minWidth: contentMinWidth
  };
  const scrollStyle: React.CSSProperties = {
    maxHeight: toDimension(scroll?.y)
  };

  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') return rowKey(record, index);
    const value = record[rowKey as keyof T];
    return value === undefined || value === null ? String(index) : String(value);
  };

  const renderCell = (column: TableColumn<T>, record: T, index: number) => {
    const value = column.dataIndex ? record[column.dataIndex as keyof T] : undefined;
    if (column.render) return column.render(value, record, index);
    if (value === undefined || value === null) return '';
    return value as React.ReactNode;
  };

  return (
    <View className={cx('ai-table-wrap', className)} style={style}>
      <ScrollView
        scrollX={scrollX}
        scrollY={scrollY}
        className={cx('ai-table-scroll', scrollX && 'ai-table-scroll-x', scrollY && 'ai-table-scroll-y')}
        style={scrollStyle}
      >
        <View className="ai-table" style={contentStyle}>
          {showHeader ? (
            <View className="ai-table-row ai-table-head-row">
              {columns.map((column, index) => (
                <View
                  key={`head-${index}`}
                  className={cx('ai-table-cell', 'ai-table-head-cell', `ai-table-align-${column.align || 'left'}`)}
                  style={{
                    ...getCellStyle(column),
                    textAlign: getTextAlign(column.align),
                    ...column.style
                  }}
                >
                  {typeof column.title === 'string' || typeof column.title === 'number' ? (
                    <Text className="ai-table-text">{column.title}</Text>
                  ) : (
                    column.title
                  )}
                </View>
              ))}
            </View>
          ) : null}

          {dataSource.length === 0 ? (
            <View className="ai-table-empty">
              <View className="ai-table-empty-icon">
                <View className="ai-table-empty-bar ai-table-empty-bar-1" />
                <View className="ai-table-empty-bar ai-table-empty-bar-2" />
                <View className="ai-table-empty-bar ai-table-empty-bar-3" />
              </View>
              {typeof emptyText === 'string' || typeof emptyText === 'number' ? (
                <Text className="ai-table-empty-text">{emptyText}</Text>
              ) : (
                emptyText
              )}
            </View>
          ) : (
            dataSource.map((record, rowIndex) => (
              <View
                key={getRowKey(record, rowIndex)}
                className={cx('ai-table-row', striped && rowIndex % 2 === 1 && 'ai-table-row-striped')}
                onClick={() => onRowClick?.(record, rowIndex)}
              >
                {columns.map((column, colIndex) => {
                  const cell = renderCell(column, record, rowIndex);

                  return (
                    <View
                      key={`cell-${rowIndex}-${colIndex}`}
                      className={cx('ai-table-cell', `ai-table-align-${column.align || 'left'}`)}
                      style={{
                        ...getCellStyle(column),
                        textAlign: getTextAlign(column.align),
                        ...column.style
                      }}
                    >
                      {typeof cell === 'string' || typeof cell === 'number' ? (
                        <Text className="ai-table-text">{cell}</Text>
                      ) : (
                        cell
                      )}
                    </View>
                  );
                })}
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {loading ? (
        <View className="ai-table-loading">
          <View className="ai-table-spinner" />
        </View>
      ) : null}
    </View>
  );
};

Table.displayName = 'Table';
