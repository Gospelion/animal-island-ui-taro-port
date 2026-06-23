Component({
  properties: {
    type: { type: String, value: 'default' },
    color: { type: String, value: 'default' },
    pattern: { type: String, value: 'none' },
    customClass: { type: String, value: '' },
    customStyle: { type: String, value: '' }
  },
  methods: {
    handleTap(event) {
      this.triggerEvent('tap', { event });
    }
  }
});
