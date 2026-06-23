Component({
  properties: {
    value: { type: String, optionalTypes: [Number], value: '' },
    options: { type: Array, value: [] },
    size: { type: String, value: 'middle' },
    direction: { type: String, value: 'horizontal' },
    disabled: { type: Boolean, value: false },
    customClass: { type: String, value: '' },
    customStyle: { type: String, value: '' }
  },
  data: {
    renderedOptions: []
  },
  observers: {
    'value, options'(value, options) {
      const renderedOptions = (Array.isArray(options) ? options : []).map((option) => ({
        ...option,
        checked: value === option.value
      }));
      this.setData({ renderedOptions });
    }
  },
  lifetimes: {
    attached() {
      const renderedOptions = (Array.isArray(this.data.options) ? this.data.options : []).map((option) => ({
        ...option,
        checked: this.data.value === option.value
      }));
      this.setData({ renderedOptions });
    }
  },
  methods: {
    handleTap(event) {
      const index = Number(event.currentTarget.dataset.index);
      const option = this.data.renderedOptions[index];
      if (!option || this.data.disabled || option.disabled) return;
      this.triggerEvent('change', { value: option.value, option, event });
    }
  }
});
