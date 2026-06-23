Component({
  options: {
    multipleSlots: true
  },
  properties: {
    type: { type: String, value: 'default' },
    size: { type: String, value: 'middle' },
    danger: { type: Boolean, value: false },
    ghost: { type: Boolean, value: false },
    block: { type: Boolean, value: false },
    loading: { type: Boolean, value: false },
    disabled: { type: Boolean, value: false },
    customClass: { type: String, value: '' },
    customStyle: { type: String, value: '' }
  },
  methods: {
    handleTap(event) {
      if (this.data.disabled || this.data.loading) return;
      this.triggerEvent('tap', { event });
    }
  }
});
