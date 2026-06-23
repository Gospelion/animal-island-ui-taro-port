import React, { useState } from 'react';
import { Text, View } from '@tarojs/components';
import { Button, Card, Icon, Input, Modal } from '@animal-island-ui/taro';
import './index.css';

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('Nook');

  return (
    <View className="page">
      <Text className="title">Animal-Island-UI Spike v0</Text>
      <Text className="subtitle">Taro line: React props, Taro components, no DOM/Portal.</Text>

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
          <Icon name="icon-miles" size="64rpx" bounce />
          <Icon name="icon-camera" size="64rpx" />
          <Icon name="icon-shopping" size="64rpx" />
        </View>
      </Card>

      <Card type="dashed" className="section">
        <Text className="section-title">Input</Text>
        <Input
          value={name}
          allowClear
          shadow
          placeholder="Your island name"
          onChange={({ value }) => setName(value)}
          prefix={<Icon name="icon-map" size="36rpx" />}
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
