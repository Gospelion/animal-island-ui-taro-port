Component({
  properties: {
    value: { type: Array, value: [] },
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
      const current = Array.isArray(value) ? value : [];
      const renderedOptions = (Array.isArray(options) ? options : []).map((option) => ({
        ...option,
        checked: current.some((item) => item === option.value)
      }));
      this.setData({ renderedOptions });
    }
  },
  lifetimes: {
    attached() {
      const current = Array.isArray(this.data.value) ? this.data.value : [];
      const renderedOptions = (Array.isArray(this.data.options) ? this.data.options : []).map((option) => ({
        ...option,
        checked: current.some((item) => item === option.value)
      }));
      this.setData({ renderedOptions });
    }
  },
  methods: {
    handleTap(event) {
      const index = Number(event.currentTarget.dataset.index);
      const option = this.data.renderedOptions[index];
      if (!option || this.data.disabled || option.disabled) return;
      const current = Array.isArray(this.data.value) ? this.data.value : [];
      const exists = current.some((item) => item === option.value);
      const next = exists ? current.filter((item) => item !== option.value) : current.concat(option.value);
      this.triggerEvent('change', { value: next, option, event });
    }
  }
});
