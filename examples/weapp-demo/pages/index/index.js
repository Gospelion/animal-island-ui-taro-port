Page({
  data: {
    modalOpen: false,
    name: 'Nook',
    quietHours: true,
    tasks: ['fruit'],
    tasksText: 'fruit',
    season: 'spring',
    taskOptions: [
      { label: 'Fruit', value: 'fruit' },
      { label: 'Flowers', value: 'flowers' },
      { label: 'Museum', value: 'museum', disabled: true }
    ],
    seasonOptions: [
      { label: 'Spring', value: 'spring' },
      { label: 'Summer', value: 'summer' },
      { label: 'Autumn', value: 'autumn' }
    ]
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
  },
  handleQuietHoursChange(event) {
    this.setData({ quietHours: event.detail.checked });
  },
  handleTasksChange(event) {
    const tasks = event.detail.value;
    this.setData({ tasks, tasksText: tasks.join(', ') || '-' });
  },
  handleSeasonChange(event) {
    this.setData({ season: event.detail.value });
  }
});
