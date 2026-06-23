Component({
  properties: {
    checked: { type: Boolean, value: false },
    size: { type: String, value: 'default' },
    disabled: { type: Boolean, value: false },
    loading: { type: Boolean, value: false },
    checkedText: { type: String, value: '' },
    uncheckedText: { type: String, value: '' },
    customClass: { type: String, value: '' },
    customStyle: { type: String, value: '' }
  },
  methods: {
    handleTap(event) {
      if (this.data.disabled || this.data.loading) return;
      this.triggerEvent('change', { checked: !this.data.checked, event });
    }
  }
});
