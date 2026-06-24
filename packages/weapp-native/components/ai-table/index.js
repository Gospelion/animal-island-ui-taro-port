function toDimension(value) {
  if (value === undefined || value === null || value === '') return '';
  if (typeof value === 'number') return `${value}rpx`;
  return String(value);
}

function normalizeAlign(value) {
  return ['left', 'center', 'right'].includes(value) ? value : 'left';
}

function getValue(record, dataIndex) {
  if (!dataIndex) return '';
  const value = record ? record[dataIndex] : '';
  return value === undefined || value === null ? '' : String(value);
}

Component({
  properties: {
    columns: {
      type: Array,
      value: [],
      observer() {
        this.normalizeTable();
      }
    },
    dataSource: {
      type: Array,
      value: [],
      observer() {
        this.normalizeTable();
      }
    },
    rowKey: {
      type: String,
      value: 'key',
      observer() {
        this.normalizeTable();
      }
    },
    striped: { type: Boolean, value: true },
    showHeader: { type: Boolean, value: true },
    loading: { type: Boolean, value: false },
    emptyText: { type: String, value: '暂无数据' },
    scrollX: {
      type: String,
      value: '',
      optionalTypes: [Boolean, Number],
      observer() {
        this.normalizeTable();
      }
    },
    scrollY: {
      type: String,
      value: '',
      optionalTypes: [Boolean, Number],
      observer() {
        this.normalizeTable();
      }
    },
    customClass: { type: String, value: '' },
    customStyle: { type: String, value: '' }
  },
  data: {
    normalizedColumns: [],
    rows: [],
    contentStyle: '',
    scrollStyle: '',
    enableScrollX: false,
    enableScrollY: false
  },
  lifetimes: {
    attached() {
      this.normalizeTable();
    }
  },
  methods: {
    normalizeTable() {
      const columns = Array.isArray(this.data.columns) ? this.data.columns : [];
      const dataSource = Array.isArray(this.data.dataSource) ? this.data.dataSource : [];
      let explicitWidthTotal = 0;

      const normalizedColumns = columns.map((column, index) => {
        const width = toDimension(column.width);
        const numericWidth = typeof column.width === 'number' ? column.width : 0;
        explicitWidthTotal += numericWidth;

        const flexStyle = width
          ? `width: ${width}; flex-basis: ${width}; flex-grow: 0; flex-shrink: 0;`
          : 'flex: 1; min-width: 0;';
        const align = normalizeAlign(column.align);
        const extraStyle = column.style ? String(column.style) : '';

        return {
          key: column.key || column.dataIndex || index,
          title: column.title === undefined || column.title === null ? '' : String(column.title),
          dataIndex: column.dataIndex || '',
          align,
          style: `${flexStyle} text-align: ${align}; ${extraStyle}`
        };
      });

      const rows = dataSource.map((record, index) => {
        const keyValue = record && this.data.rowKey ? record[this.data.rowKey] : undefined;
        const key = keyValue === undefined || keyValue === null ? String(index) : String(keyValue);

        return {
          key,
          index,
          record,
          cells: normalizedColumns.map((column, cellIndex) => ({
            key: `${key}-${column.key || cellIndex}`,
            value: getValue(record, column.dataIndex),
            align: column.align,
            style: column.style
          }))
        };
      });

      const scrollXSize = typeof this.data.scrollX === 'boolean' ? '' : toDimension(this.data.scrollX);
      const scrollYSize = typeof this.data.scrollY === 'boolean' ? '' : toDimension(this.data.scrollY);
      const contentMinWidth = scrollXSize || (explicitWidthTotal > 0 ? `${explicitWidthTotal}rpx` : '');
      const contentStyle = contentMinWidth ? `min-width: ${contentMinWidth};` : '';
      const scrollStyle = scrollYSize ? `max-height: ${scrollYSize};` : '';

      this.setData({
        normalizedColumns,
        rows,
        contentStyle,
        scrollStyle,
        enableScrollX: Boolean(this.data.scrollX || explicitWidthTotal > 0),
        enableScrollY: Boolean(this.data.scrollY)
      });
    },
    handleRowTap(event) {
      const index = event.currentTarget.dataset.index;
      const row = this.data.rows[index];
      if (!row) return;
      this.triggerEvent('rowtap', {
        record: row.record,
        index: row.index,
        key: row.key
      });
    }
  }
});
