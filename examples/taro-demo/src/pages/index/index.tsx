import React, { useMemo, useState } from 'react';
import { ScrollView, Text, View } from '@tarojs/components';
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Icon,
  Input,
  Modal,
  Radio,
  Switch,
  Title,
  type TitleColor
} from '@animal-island-ui/taro';
import './index.css';

type PageKey = 'home' | 'title' | 'button' | 'input' | 'switch' | 'card' | 'modal' | 'divider' | 'icon' | 'checkbox' | 'radio';

const pageInfo: Record<PageKey, { title: string; desc: string; badge: string }> = {
  home: { title: 'Animal Island UI', desc: 'Animal 风格的 Taro 组件展示页，复刻原仓库 demo 的首页、侧边导航和组件文档逻辑。', badge: 'Taro' },
  title: { title: 'Title 标题', desc: '装饰标题组件，提供丝带式层次和多种主题色。', badge: 'ribbon' },
  button: { title: 'Button 按钮', desc: '支持 type、size、danger、ghost、loading、disabled 等常用状态。', badge: '6 types' },
  input: { title: 'Input 输入框', desc: '支持前后缀、清除按钮、校验状态、阴影和禁用状态。', badge: '3 sizes' },
  switch: { title: 'Switch 开关', desc: '支持受控状态、自定义文案、小尺寸、禁用和加载。', badge: '2 sizes' },
  card: { title: 'Card 卡片', desc: '支持默认 / 虚线样式、多种背景色和装饰纹理。', badge: 'colors' },
  modal: { title: 'Modal 弹窗', desc: '在 Taro 节点树内渲染，支持标题、遮罩和自定义 footer。', badge: 'no portal' },
  divider: { title: 'Divider 分割线', desc: '装饰性分割线，支持实线、虚线和波浪线。', badge: '9 types' },
  icon: { title: 'Icon 图标', desc: '岛屿主题图标，支持尺寸和弹跳动效。', badge: 'icons' },
  checkbox: { title: 'Checkbox 多选框', desc: '支持受控 / 非受控、方向、尺寸和禁用选项。', badge: 'controlled' },
  radio: { title: 'Radio 单选框', desc: '支持受控 / 非受控、方向、尺寸和禁用选项。', badge: 'controlled' }
};

const menu = [
  {
    title: '-- 基础组件 --',
    children: [
      ['title', 'Title 标题', true],
      ['button', 'Button 按钮'],
      ['input', 'Input 输入框'],
      ['switch', 'Switch 开关'],
      ['card', 'Card 卡片'],
      ['modal', 'Modal 弹窗'],
      ['divider', 'Divider 分割线'],
      ['icon', 'Icon 图标'],
      ['checkbox', 'Checkbox 多选框'],
      ['radio', 'Radio 单选框']
    ]
  },
  {
    title: '-- 待移植组件 --',
    children: [
      ['collapse', 'Collapse 折叠面板', false, true],
      ['typewriter', 'Typewriter 打字机', false, true],
      ['select', 'Select 选择器', false, true],
      ['tabs', 'Tabs 标签页', false, true],
      ['loading', 'Loading 加载', true, true],
      ['form', 'Form 表单', true, true],
      ['table', 'Table 表格', false, true]
    ]
  }
] as const;

const titleColors: TitleColor[] = ['lime-green', 'default', 'app-pink', 'purple', 'app-blue', 'app-yellow', 'app-orange', 'app-red'];

function titleColor(key: PageKey): TitleColor {
  return titleColors[key.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % titleColors.length];
}

function Code({ children }: { children: string }) {
  return (
    <View className="code-box">
      <Text className="code-text">{children}</Text>
    </View>
  );
}

function Api({ rows }: { rows: string[][] }) {
  return (
    <View className="api-table">
      <View className="api-row api-head">
        <Text>属性</Text>
        <Text>说明</Text>
        <Text>类型</Text>
      </View>
      {rows.map((row) => (
        <View className="api-row" key={row[0]}>
          <Text>{row[0]}</Text>
          <Text>{row[1]}</Text>
          <Text>{row[2]}</Text>
        </View>
      ))}
    </View>
  );
}

function Section({ title, badge, children }: { title: string; badge?: string; children: React.ReactNode }) {
  return (
    <Card className="doc-section">
      <View className="section-heading">
        <Text className="section-title">{title}</Text>
        {badge ? <Text className="section-badge">{badge}</Text> : null}
      </View>
      {children}
    </Card>
  );
}

function Sidebar({ active, onGo, className }: { active: PageKey; onGo: (key: PageKey) => void; className?: string }) {
  return (
    <View className={`sidebar ${className ?? ''}`}>
      <View className="sidebar-header" onClick={() => onGo('home')}>
        <View className="nook-mark">AI</View>
        <Text className="sidebar-title">TARO啦! Animal</Text>
      </View>
      <ScrollView scrollY className="menu-scroll">
        {menu.map((group) => (
          <View key={group.title} className="menu-group">
            <Text className="menu-group-title">{group.title}</Text>
            {group.children.map(([key, label, isNew, disabled]) => (
              <View
                key={key}
                className={`menu-item ${active === key ? 'is-active' : ''} ${disabled ? 'is-disabled' : ''}`}
                onClick={() => !disabled && onGo(key as PageKey)}
              >
                <Text className="menu-label">{label}</Text>
                {isNew ? <Text className="menu-badge">NEW</Text> : null}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function HomePage({ onGo }: { onGo: (key: PageKey) => void }) {
  const cards = (menu[0].children as readonly (readonly [PageKey, string, boolean?])[]).map(([key, label]) => ({ key, label }));
  return (
    <ScrollView scrollY className="home-page">
      <View className="home-hero">
        <View className="hero-copy">
          <Text className="hero-title">Animal{'\n'}Island UI</Text>
          <Text className="hero-version">v1.0.0 Taro</Text>
          <Text className="hero-subtitle">Animal 风格的 Taro 组件展示页。首页、组件入口、进入组件后的侧边导航和文档结构，都按原仓库 demo 的逻辑重新组织。</Text>
          <View className="hero-actions">
            <Button type="primary" size="large" onClick={() => onGo('button')}>开始使用</Button>
            <Button type="dashed" size="large" onClick={() => onGo('title')}>查看标题</Button>
          </View>
        </View>
        <View className="logo-island" onClick={() => onGo('icon')}>
          <Icon name="icon-leaf" size="96rpx" bounce />
          <Text className="logo-text">Taro</Text>
        </View>
      </View>
      <View className="home-section">
        <Text className="home-section-title">特性</Text>
        <Text className="home-section-desc">为什么选择 animal-island-ui 的 Taro 版本</Text>
        <View className="feature-grid">
          {['Animal 风格', '跨端约束', '状态完整', '渐进移植'].map((item, index) => (
            <Card key={item} className="feature-card" pattern="default">
              <Text className={`feature-icon feature-${index}`}>{item.slice(0, 1)}</Text>
              <Text className="feature-title">{item}</Text>
              <Text className="feature-desc">保留原 demo 的页面组织，同时使用 Taro 节点和已移植组件实现。</Text>
            </Card>
          ))}
        </View>
      </View>
      <Divider className="home-divider" type="wave-yellow" />
      <View className="home-section">
        <Text className="home-section-title">组件一览</Text>
        <Text className="home-section-desc">点击卡片进入详细文档和在线演示</Text>
        <View className="component-grid">
          {cards.map(({ key, label }) => (
            <Card key={key} className="component-card" onClick={() => onGo(key)}>
              <Text className="component-name">{label}</Text>
              <Text className="component-desc">{pageInfo[key].desc}</Text>
            </Card>
          ))}
        </View>
      </View>
      <Divider className="home-divider" type="line-teal" />
      <View className="home-section">
        <Text className="home-section-title">安装</Text>
        <Text className="home-section-desc">工作区内的 Taro 示例使用本地 workspace 包</Text>
        <Code>{'npm install @animal-island-ui/taro\nnpm run demo:taro:h5'}</Code>
      </View>
    </ScrollView>
  );
}

function ButtonDemo() {
  return (
    <>
      <Section title="type 按钮类型" badge="basic">
        <View className="demo-row"><Button type="primary">Primary</Button><Button>Default</Button><Button type="dashed">Dashed</Button><Button type="text">Text</Button><Button type="link">Link</Button></View>
      </Section>
      <Section title="状态和尺寸">
        <View className="demo-row"><Button type="primary" danger>Danger</Button><Button type="primary" ghost>Ghost</Button><Button type="primary" loading>Loading</Button><Button type="primary" disabled>Disabled</Button><Button type="primary" size="small">Small</Button><Button type="primary" size="large">Large</Button></View>
      </Section>
      <Code>{"import { Button } from '@animal-island-ui/taro';\n<Button type=\"primary\" loading>Loading</Button>"}</Code>
      <Api rows={[['type', '按钮类型', 'primary | default | dashed | text | link'], ['size', '按钮尺寸', 'small | middle | large'], ['loading', '加载状态', 'boolean']]} />
    </>
  );
}

function InputDemo() {
  const [name, setName] = useState('Nook');
  return (
    <>
      <Section title="基础用法" badge="controlled">
        <View className="demo-col"><Input placeholder="Basic input" /><Input value={name} allowClear shadow placeholder="Your island name" onChange={({ value }) => setName(value)} prefix={<Icon name="icon-map" size="22rpx" />} /><Input placeholder="Warning status" status="warning" /><Input placeholder="Error status" status="error" /><Input placeholder="Disabled" disabled /></View>
        <Text className="hint">Current value: {name || '-'}</Text>
      </Section>
      <Code>{"<Input allowClear value={name} onChange={({ value }) => setName(value)} />"}</Code>
      <Api rows={[['allowClear', '允许清除', 'boolean'], ['status', '校验状态', 'error | warning'], ['onChange', '值变化回调', '({ value }) => void']]} />
    </>
  );
}

function SwitchDemo() {
  const [checked, setChecked] = useState(true);
  return (
    <>
      <Section title="基础和文案" badge={checked ? 'ON' : 'OFF'}><View className="demo-row"><Switch checked={checked} checkedChildren="开" unCheckedChildren="关" onChange={setChecked} /><Switch size="small" checked={checked} onChange={setChecked} /><Switch loading checked /><Switch disabled /></View></Section>
      <Code>{'<Switch checked={checked} checkedChildren="开" unCheckedChildren="关" onChange={setChecked} />'}</Code>
      <Api rows={[['checked', '受控选中值', 'boolean'], ['size', '开关尺寸', 'small | default'], ['onChange', '变化回调', '(checked) => void']]} />
    </>
  );
}

function CardDemo() {
  const colors = ['default', 'app-pink', 'purple', 'app-blue', 'app-yellow', 'app-orange', 'app-teal', 'app-green'] as const;
  return (
    <>
      <Section title="颜色和纹理" badge="palette"><View className="swatch-grid">{colors.map((color) => <Card key={color} color={color} pattern={color === 'default' ? 'none' : color} className="swatch-card"><Text>{color}</Text></Card>)}</View></Section>
      <Section title="虚线卡片"><Card type="dashed"><Text>适合提示、空状态或者尚未移植的能力说明。</Text></Card></Section>
      <Code>{'<Card color="app-yellow" pattern="default">Island card</Card>'}</Code>
      <Api rows={[['type', '卡片类型', 'default | dashed'], ['color', '背景色', 'CardColor'], ['pattern', '背景纹理', 'none | CardColor']]} />
    </>
  );
}

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Section title="弹窗示例" badge="normal tree"><View className="demo-row"><Button type="primary" onClick={() => setOpen(true)}>打开 Modal</Button></View></Section>
      <Modal open={open} title="欢迎来到岛上" onClose={() => setOpen(false)} onOk={() => setOpen(false)}><Text>Modal 渲染在普通 Taro 节点树里，不依赖 React Portal。</Text></Modal>
      <Code>{'<Modal open={open} title="欢迎来到岛上" onClose={close} onOk={close}>内容</Modal>'}</Code>
      <Api rows={[['open', '是否可见', 'boolean'], ['title', '标题', 'ReactNode'], ['footer', '自定义底部', 'ReactNode | null']]} />
    </>
  );
}

function DividerDemo() {
  const types = ['line-brown', 'line-teal', 'line-yellow', 'wave-yellow', 'dashed-brown', 'dashed-teal', 'dashed-yellow'] as const;
  return <><Section title="分割线类型" badge="decorative"><View className="divider-list">{types.map((type) => <View key={type} className="divider-demo-item"><Text>{type}</Text><Divider type={type} /></View>)}</View></Section><Code>{'<Divider type="wave-yellow" />'}</Code><Api rows={[['type', '分割线类型', 'DividerType']]} /></>;
}

function IconDemo() {
  const icons = ['icon-miles', 'icon-camera', 'icon-shopping', 'icon-map', 'icon-leaf', 'icon-diy'] as const;
  return <><Section title="图标列表" badge="bounce"><View className="icon-grid">{icons.map((name) => <View key={name} className="icon-cell"><Icon name={name} size="70rpx" bounce /><Text>{name.replace('icon-', '')}</Text></View>)}</View></Section><Code>{'<Icon name="icon-camera" size="70rpx" bounce />'}</Code><Api rows={[['name', '图标名称', 'IconName'], ['bounce', '弹跳动效', 'boolean']]} /></>;
}

function TitleDemo() {
  return <><Section title="尺寸"><View className="demo-col title-demo-col"><Title size="small" color="app-yellow">Small Tag</Title><Title color="app-teal">Middle Ribbon</Title><Title size="large" color="purple">Large Title</Title></View></Section><Section title="主题色"><View className="title-color-grid">{titleColors.map((color) => <Title key={color} size="small" color={color}>{color}</Title>)}</View></Section><Code>{'<Title size="large" color="app-teal">Island Kit</Title>'}</Code><Api rows={[['size', '标题尺寸', 'small | middle | large'], ['color', '主题色', 'TitleColor']]} /></>;
}

function CheckboxDemo() {
  const [tasks, setTasks] = useState<Array<string | number>>(['fruit']);
  const options = [{ label: '水果', value: 'fruit' }, { label: '花朵', value: 'flowers' }, { label: '博物馆', value: 'museum', disabled: true }];
  return <><Section title="受控多选" badge={String(tasks.length)}><Checkbox options={options} value={tasks} onChange={setTasks} /><Text className="hint">Today: {tasks.join(', ') || '-'}</Text></Section><Section title="垂直排列"><Checkbox options={options} defaultValue={['flowers']} direction="vertical" size="large" /></Section><Code>{'<Checkbox options={options} value={tasks} onChange={setTasks} />'}</Code><Api rows={[['options', '选项列表', 'CheckboxOption[]'], ['value', '受控值', 'Array<string | number>'], ['direction', '排列方向', 'horizontal | vertical']]} /></>;
}

function RadioDemo() {
  const [season, setSeason] = useState<string | number>('spring');
  const options = [{ label: '春天', value: 'spring' }, { label: '夏天', value: 'summer' }, { label: '秋天', value: 'autumn' }, { label: '冬天', value: 'winter', disabled: true }];
  return <><Section title="受控单选" badge={String(season)}><Radio options={options} value={season} onChange={setSeason} /></Section><Section title="垂直排列"><Radio options={options} defaultValue="summer" direction="vertical" size="large" /></Section><Code>{'<Radio options={options} value={season} onChange={setSeason} />'}</Code><Api rows={[['options', '选项列表', 'RadioOption[]'], ['value', '受控值', 'string | number'], ['direction', '排列方向', 'horizontal | vertical']]} /></>;
}

function ComponentPage({ active }: { active: PageKey }) {
  const Demo = useMemo(() => ({ title: TitleDemo, button: ButtonDemo, input: InputDemo, switch: SwitchDemo, card: CardDemo, modal: ModalDemo, divider: DividerDemo, icon: IconDemo, checkbox: CheckboxDemo, radio: RadioDemo, home: () => null })[active], [active]);
  return (
    <ScrollView scrollY className="component-scroll">
      <View className="component-doc">
        <Title size="large" color={titleColor(active)} className="doc-title">{pageInfo[active].title}</Title>
        <Text className="doc-desc">{pageInfo[active].desc}</Text>
        <View className="doc-content-surface">
          <Demo />
        </View>
      </View>
    </ScrollView>
  );
}

export default function Index() {
  const [active, setActive] = useState<PageKey>('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const go = (key: PageKey) => {
    if (active === 'home' && key !== 'home') {
      setLoading(true);
      setTimeout(() => setLoading(false), 700);
    }
    setActive(key);
    setDrawerOpen(false);
  };

  if (active === 'home') {
    return <View className="app-shell home-shell"><HomePage onGo={go} />{loading ? <View className="loading-mask"><View className="loading-card"><Icon name="icon-leaf" size="72rpx" bounce /><Text>正在登岛...</Text></View></View> : null}</View>;
  }

  return (
    <View className="app-shell doc-shell">
      <Sidebar active={active} onGo={go} />
      <View className="mobile-topbar"><Text className="topbar-action" onClick={() => go('home')}>Back</Text><Text className="topbar-title">{pageInfo[active].title}</Text><Text className="topbar-action" onClick={() => setDrawerOpen(true)}>Menu</Text></View>
      {drawerOpen ? <View className="drawer-layer"><View className="drawer-mask" onClick={() => setDrawerOpen(false)} /><Sidebar active={active} onGo={go} className="drawer-sidebar" /></View> : null}
      <View className="doc-main"><ComponentPage active={active} /></View>
      <View className="guide-line" />
    </View>
  );
}
