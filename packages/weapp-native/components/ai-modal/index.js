Component({
  options: {
    multipleSlots: true
  },
  properties: {
    open: { type: Boolean, value: false },
    title: { type: String, value: '' },
    width: { type: String, value: '640rpx' },
    maskClosable: { type: Boolean, value: true },
    showFooter: { type: Boolean, value: true },
    customClass: { type: String, value: '' },
    customStyle: { type: String, value: '' },
    maskStyle: { type: String, value: '' }
  },
  methods: {
    noop() {},
    handleMaskTap() {
      if (this.data.maskClosable) this.triggerEvent('close');
    },
    handleClose() {
      this.triggerEvent('close');
    },
    handleOk() {
      this.triggerEvent('ok');
    }
  }
});
