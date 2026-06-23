Page({
  data: {
    modalOpen: false,
    name: 'Nook'
  },
  openModal() {
    this.setData({ modalOpen: true });
  },
  closeModal() {
    this.setData({ modalOpen: false });
  },
  handleNameChange(event) {
    this.setData({ name: event.detail.value });
  },
  handleNameClear() {
    this.setData({ name: '' });
  }
});
