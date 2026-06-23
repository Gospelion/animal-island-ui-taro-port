Component({
  options: {
    multipleSlots: true
  },
  properties: {
    question: { type: String, value: '' },
    expanded: {
      type: null,
      value: null,
      observer(value) {
        if (value !== null && value !== undefined) {
          this.setData({ innerExpanded: Boolean(value) });
        }
      }
    },
    defaultExpanded: {
      type: Boolean,
      value: false,
      observer(value) {
        if (!this.isControlled()) {
          this.setData({ innerExpanded: Boolean(value) });
        }
      }
    },
    disabled: { type: Boolean, value: false },
    customClass: { type: String, value: '' },
    customStyle: { type: String, value: '' }
  },
  data: {
    innerExpanded: false
  },
  lifetimes: {
    attached() {
      this.setData({
        innerExpanded: this.isControlled() ? Boolean(this.data.expanded) : Boolean(this.data.defaultExpanded)
      });
    }
  },
  methods: {
    isControlled() {
      return this.data.expanded !== null && this.data.expanded !== undefined;
    },
    handleTap(event) {
      if (this.data.disabled) return;
      const nextExpanded = !this.data.innerExpanded;
      if (!this.isControlled()) {
        this.setData({ innerExpanded: nextExpanded });
      }
      this.triggerEvent('change', { expanded: nextExpanded, event });
    }
  }
});
