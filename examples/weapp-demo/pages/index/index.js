Page({
  data: {
    modalOpen: false,
    name: 'Nook',
    quietHours: true,
    collapseOpen: true,
    collapseStatus: 'open',
    codeBlockBasic: `import React from 'react';
import { Button } from 'animal-island-ui';

const App = () => (
    <Button type="primary">Button</Button>
);

export default App;`,
    codeBlockCustom: `import { CodeBlock } from 'animal-island-ui';

<CodeBlock
    code={codeString}
    style={{ borderRadius: 5, backgroundColor: '#242c46ff' }}
    className="custom-code"
/>`,
    tasks: ['fruit'],
    tasksText: 'fruit',
    season: 'spring',
    tableSelection: 'none',
    tableColumns: [
      { title: 'Villager', dataIndex: 'name', width: 170 },
      { title: 'Island', dataIndex: 'island', width: 210 },
      { title: 'Fruit', dataIndex: 'fruit', width: 150 },
      { title: 'Bells', dataIndex: 'bells', width: 150, align: 'right' }
    ],
    tableRows: [
      { key: '1', name: 'Molly', island: 'Maple Bay', fruit: 'Apple', bells: 1280 },
      { key: '2', name: 'Roald', island: 'Snowcap', fruit: 'Orange', bells: 960 },
      { key: '3', name: 'Fauna', island: 'Cedar Cove', fruit: 'Pear', bells: 1540 }
    ],
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
  handleCollapseChange(event) {
    const collapseOpen = event.detail.expanded;
    this.setData({ collapseOpen, collapseStatus: collapseOpen ? 'open' : 'closed' });
  },
  handleTasksChange(event) {
    const tasks = event.detail.value;
    this.setData({ tasks, tasksText: tasks.join(', ') || '-' });
  },
  handleSeasonChange(event) {
    this.setData({ season: event.detail.value });
  },
  handleTableRowTap(event) {
    this.setData({ tableSelection: event.detail.record.name });
  }
});
