import React, { useState } from 'react';
import { Text, View } from '@tarojs/components';
import { Button, Card, Checkbox, Divider, Icon, Input, Modal, Radio, Switch, Title } from '@animal-island-ui/taro';
import './index.css';

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('Nook');
  const [quietHours, setQuietHours] = useState(true);
  const [tasks, setTasks] = useState<Array<string | number>>(['fruit']);
  const [season, setSeason] = useState<string | number>('spring');

  const taskOptions = [
    { label: 'Fruit', value: 'fruit' },
    { label: 'Flowers', value: 'flowers' },
    { label: 'Museum', value: 'museum', disabled: true }
  ];

  const seasonOptions = [
    { label: 'Spring', value: 'spring' },
    { label: 'Summer', value: 'summer' },
    { label: 'Autumn', value: 'autumn' }
  ];

  return (
    <View className="page">
      <Text className="title">Animal-Island-UI Spike v1</Text>
      <Text className="subtitle">Taro line: React props, Taro components, no DOM/Portal.</Text>

      <View className="title-wrap">
        <Title color="app-teal" size="large">Island Kit</Title>
      </View>
      <Divider type="wave-yellow" className="hero-divider" />

      <Card color="app-yellow" pattern="default" className="section">
        <Text className="section-title">Button</Text>
        <View className="row">
          <Button type="primary" onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="primary" loading>Loading</Button>
        </View>
      </Card>

      <Card color="app-blue" className="section">
        <Text className="section-title">Icon</Text>
        <View className="row">
          <Icon name="icon-miles" size="64px" bounce />
          <Icon name="icon-camera" size="64px" bounce />
          <Icon name="icon-shopping" size="64px" bounce />
        </View>
      </Card>

      <Card color="app-green" className="section">
        <Text className="section-title">Switch</Text>
        <View className="row">
          <Switch checked={quietHours} checkedChildren="ON" unCheckedChildren="OFF" onChange={setQuietHours} />
          <Switch size="small" checked={quietHours} onChange={setQuietHours} />
          <Switch loading checked />
        </View>
        <Text className="hint">Quiet hours: {quietHours ? 'enabled' : 'disabled'}</Text>
      </Card>

      <Card color="warm-peach-pink" className="section">
        <Text className="section-title">Checkbox</Text>
        <Checkbox options={taskOptions} value={tasks} onChange={setTasks} />
        <Text className="hint">Today: {tasks.join(', ') || '-'}</Text>
      </Card>

      <Card color="app-teal" className="section">
        <Text className="section-title">Radio</Text>
        <Radio options={seasonOptions} value={season} onChange={setSeason} />
        <Text className="hint">Season: {season}</Text>
      </Card>

      <Card color="app-orange" className="section">
        <Text className="section-title">Title and Divider</Text>
        <View className="title-stack">
          <Title size="small" color="app-yellow">Small Tag</Title>
          <Title color="purple">Ribbon Title</Title>
        </View>
        <Divider type="line-teal" className="demo-divider" />
        <Divider type="dashed-brown" className="demo-divider" />
      </Card>

      <Card type="dashed" className="section">
        <Text className="section-title">Input</Text>
        <Input
          value={name}
          allowClear
          shadow
          placeholder="Your island name"
          onChange={({ value }) => setName(value)}
          prefix={<Icon name="icon-map" size="20px" />}
        />
        <Text className="hint">Current value: {name || '-'}</Text>
      </Card>

      <Modal
        open={modalOpen}
        title="Welcome to the island"
        onClose={() => setModalOpen(false)}
        onOk={() => setModalOpen(false)}
      >
        <Text>Modal is rendered in normal Taro tree, not through React Portal.</Text>
      </Modal>
    </View>
  );
}
