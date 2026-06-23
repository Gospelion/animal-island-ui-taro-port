Component({
  options: {
    multipleSlots: true
  },
  properties: {
    size: { type: String, value: 'middle' },
    allowClear: { type: Boolean, value: false },
    status: { type: String, value: '' },
    shadow: { type: Boolean, value: false },
    disabled: { type: Boolean, value: false },
    value: {
      type: String,
      value: '',
      observer(value) {
        this.setData({ innerValue: value });
      }
    },
    defaultValue: {
      type: String,
      value: '',
      observer(value) {
        if (!this.data.value) this.setData({ innerValue: value });
      }
    },
    placeholder: { type: String, value: '' },
    customClass: { type: String, value: '' },
    customStyle: { type: String, value: '' }
  },
  data: {
    innerValue: ''
  },
  lifetimes: {
    attached() {
      this.setData({ innerValue: this.data.value || this.data.defaultValue || '' });
    }
  },
  methods: {
    handleInput(event) {
      const value = event.detail.value;
      this.setData({ innerValue: value });
      this.triggerEvent('change', { value });
    },
    handleClear() {
      this.setData({ innerValue: '' });
      this.triggerEvent('change', { value: '' });
      this.triggerEvent('clear');
    }
  }
});
