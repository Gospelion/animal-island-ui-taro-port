import React, { useMemo, useState } from 'react';
import { ScrollView, Text, View } from '@tarojs/components';
import {
  Button,
  Card,
  Checkbox,
  CodeBlock,
  Collapse,
  Divider,
  Icon,
  ICON_LIST,
  Input,
  Modal,
  Radio,
  Switch,
  Table,
  Typewriter,
  Title,
  type DividerType,
  type TableColumn,
  type TitleColor
} from '@animal-island-ui/taro';
import './index.css';

type PageKey = 'home' | 'title' | 'button' | 'input' | 'switch' | 'card' | 'modal' | 'divider' | 'icon' | 'checkbox' | 'radio' | 'collapse' | 'codeblock' | 'table' | 'typewriter';

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
  radio: { title: 'Radio 单选框', desc: '支持受控 / 非受控、方向、尺寸和禁用选项。', badge: 'controlled' },
  collapse: { title: 'Collapse 折叠面板', desc: 'FAQ 风格的状态型折叠面板，支持受控、默认展开和禁用状态。', badge: 'stateful' },
  codeblock: { title: 'CodeBlock 代码高亮', desc: '深色 JSX / TS 代码块，沿用上游正则高亮逻辑，并固定 14PX 字号与 600 字重。', badge: 'JSX/TS' },
  table: { title: 'Table 表格', desc: '基于 ScrollView + View 的数据表格，支持斑马纹、加载态、空状态和横向滚动。', badge: '表格' },
  typewriter: { title: 'Typewriter 打字机', desc: '保留原有 ReactNode 结构，并按字符逐步显示文本内容。', badge: '90ms' }
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
      ['radio', 'Radio 单选框'],
      ['collapse', 'Collapse 折叠面板', true],
      ['codeblock', 'CodeBlock 代码高亮', true],
      ['table', 'Table 表格', true],
      ['typewriter', 'Typewriter 打字机', true]
    ]
  },
  {
    title: '-- 待移植组件 --',
    children: [
      ['select', 'Select 选择器', false, true],
      ['tabs', 'Tabs 标签页', false, true],
      ['loading', 'Loading 加载', true, true],
      ['form', 'Form 表单', true, true]
    ]
  }
] as const;

const titleColors: TitleColor[] = ['lime-green', 'default', 'app-pink', 'purple', 'app-blue', 'app-yellow', 'app-orange', 'app-red'];

function titleColor(key: PageKey): TitleColor {
  return titleColors[key.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % titleColors.length];
}

function Code({ children }: { children: string }) {
  return <CodeBlock code={children} className="demo-code-block" />;
}

interface ApiRow extends Record<string, unknown> {
  property: string;
  description: string;
  type: string;
}

const apiColumns: TableColumn<ApiRow>[] = [
  { title: '属性', dataIndex: 'property', width: 220 },
  { title: '说明', dataIndex: 'description', width: 320 },
  { title: '类型', dataIndex: 'type', width: 320 }
];

function Api({ rows }: { rows: string[][] }) {
  const dataSource = rows.map(([property, description, type]) => ({
    key: property,
    property,
    description,
    type
  }));

  return (
    <Table
      className="api-table"
      columns={apiColumns}
      dataSource={dataSource}
      rowKey="key"
      scroll={{ x: 860 }}
      striped={false}
    />
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
  const [inputValue, setInputValue] = useState('');
  return (
    <>
      <Section title="shadow 阴影控制">
        <View className="demo-col input-demo-col">
          <Input placeholder="No shadow (default)" />
          <Input placeholder="With shadow" shadow />
        </View>
      </Section>
      <Section title="基础用法">
        <View className="demo-col input-demo-col">
          <Input placeholder="Basic input" />
          <Input
            placeholder="With clear"
            allowClear
            value={inputValue}
            onChange={({ value }) => setInputValue(value)}
            onClear={() => setInputValue('')}
          />
          <Input
            placeholder="Prefix & Suffix"
            prefix={<Icon name="icon-map" size="22rpx" />}
            suffix={<Text>↵</Text>}
          />
        </View>
      </Section>
      <Section title="size 尺寸">
        <View className="demo-col input-demo-col">
          <Input placeholder="Small" size="small" />
          <Input placeholder="Middle (default)" size="middle" />
          <Input placeholder="Large" size="large" />
        </View>
      </Section>
      <Section title="status 校验状态">
        <View className="demo-col input-demo-col">
          <Input placeholder="Error status" status="error" />
          <Input placeholder="Warning status" status="warning" />
        </View>
      </Section>
      <Section title="disabled 禁用">
        <View className="demo-col input-demo-col">
          <Input placeholder="Disabled" disabled />
        </View>
      </Section>
      <Code>{"<Input placeholder=\"With clear\" allowClear value={value} onChange={({ value }) => setValue(value)} />"}</Code>
      <Api rows={[['size', '输入框尺寸', 'small | middle | large'], ['prefix / suffix', '前后缀内容', 'ReactNode'], ['allowClear', '允许清除', 'boolean'], ['status', '校验状态', 'error | warning'], ['shadow', '是否显示阴影', 'boolean']]} />
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
  const items: Array<{ type: DividerType; label: string; dark?: boolean }> = [
    { type: 'line-brown', label: 'line-brown（实线棕色）' },
    { type: 'line-teal', label: 'line-teal（实线青色）' },
    { type: 'line-white', label: 'line-white（实线白色）', dark: true },
    { type: 'line-yellow', label: 'line-yellow（实线黄色）' },
    { type: 'wave-yellow', label: 'wave-yellow（波浪线黄色）' },
    { type: 'dashed-brown', label: 'dashed-brown（虚线棕色）' },
    { type: 'dashed-teal', label: 'dashed-teal（虚线青色）' },
    { type: 'dashed-white', label: 'dashed-white（虚线白色）', dark: true },
    { type: 'dashed-yellow', label: 'dashed-yellow（虚线黄色）' }
  ];
  return <><Section title="Divider" badge="9 types"><View className="divider-list">{items.map(({ type, label, dark }) => <View key={type} className="divider-demo-item"><Text className="divider-demo-label">{label}</Text><View className={`divider-preview ${dark ? 'divider-preview-dark' : ''}`}><Divider type={type} /></View></View>)}</View></Section><Code>{'<Divider type="wave-yellow" />'}</Code><Api rows={[['type', '分割线类型', 'DividerType']]} /></>;
}

function IconDemo() {
  const basicIcons = ICON_LIST.slice(0, 5);
  const bounceIcons = ICON_LIST.slice(0, 3);
  const sizePreview = [
    { label: '24', size: '24rpx' },
    { label: '36', size: '36rpx' },
    { label: '48', size: '48rpx' },
    { label: '64', size: '64rpx' },
    { label: '88', size: '88rpx' }
  ];

  return (
    <>
      <Section title="基础用法" badge={`${ICON_LIST.length} icons`}>
        <View className="icon-demo-strip">
          {basicIcons.map((icon) => (
            <View key={icon.name} className="icon-demo-sample">
              <Icon name={icon.name} size="54rpx" />
            </View>
          ))}
        </View>
      </Section>
      <Section title="size 尺寸">
        <View className="icon-size-row">
          {sizePreview.map(({ label, size }) => (
            <View key={size} className="icon-size-item">
              <Icon name="icon-miles" size={size} />
              <Text>{label}</Text>
            </View>
          ))}
        </View>
      </Section>
      <Section title="bounce 弹跳动画（鼠标悬停查看效果）">
        <View className="icon-demo-strip">
          {bounceIcons.map((icon) => (
            <View key={icon.name} className="icon-demo-sample">
              <Icon name={icon.name} size="58rpx" bounce />
            </View>
          ))}
        </View>
      </Section>
      <Section title="图标列表">
        <View className="icon-list-table">
          {ICON_LIST.map((icon) => (
            <View key={icon.name} className="icon-list-row">
              <View className="icon-list-main">
                <Icon name={icon.name} size="52rpx" />
                <Text className="icon-list-label">{icon.label}</Text>
              </View>
              <Text className="icon-list-name">{icon.name}</Text>
            </View>
          ))}
        </View>
      </Section>
      <Code>{'<Icon name="icon-camera" size="70rpx" bounce />'}</Code>
      <Api rows={[['name', '图标名称', 'IconName'], ['size', '图标尺寸', 'number | string'], ['bounce', '弹跳动效', 'boolean']]} />
    </>
  );
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

function CollapseDemo() {
  const [expanded, setExpanded] = useState(true);
  return (
    <>
      <Section title="基础用法" badge="uncontrolled">
        <View className="demo-col">
          <Collapse question="什么时候适合使用 Collapse?">
            <Text>适合展示 FAQ、设置说明和可以逐步展开的短内容。</Text>
          </Collapse>
          <Collapse question="默认展开" defaultExpanded>
            <Text>通过 defaultExpanded 设置初始展开状态，之后由组件内部维护。</Text>
          </Collapse>
          <Collapse question="禁用状态" disabled>
            <Text>禁用后点击标题区不会触发展开或收起。</Text>
          </Collapse>
        </View>
      </Section>
      <Section title="受控状态" badge={expanded ? 'open' : 'closed'}>
        <View className="demo-col">
          <Collapse question="今日岛屿清单" expanded={expanded} onChange={setExpanded}>
            <Text>浇花、整理背包、给好友寄一张明信片。</Text>
          </Collapse>
          <Button type="dashed" onClick={() => setExpanded((value) => !value)}>Toggle controlled panel</Button>
        </View>
      </Section>
      <Code>{"<Collapse question=\"今日岛屿清单\" expanded={expanded} onChange={setExpanded}>内容</Collapse>"}</Code>
      <Api rows={[['question', '标题内容', 'ReactNode'], ['expanded', '受控展开值', 'boolean'], ['defaultExpanded', '默认展开值', 'boolean'], ['onChange', '展开变化回调', '(expanded) => void']]} />
    </>
  );
}

function CodeBlockDemo() {
  const basicCode = `import React from 'react';
import { Button } from 'animal-island-ui';

const App = () => (
    <Button type="primary">按钮</Button>
);

export default App;`;

  const customCode = `import React from 'react';
import { CodeBlock } from 'animal-island-ui';

<CodeBlock
    code={codeString}
    style={{ borderRadius: 5, backgroundColor: '#242c46ff' }}
    className="custom-code"
/>`;

  const usageCode = `import React from 'react';
import { CodeBlock } from 'animal-island-ui';

const App = () => {
    return (
        <div>
            {/* 基础用法 */}
            <CodeBlock code={codeString} />

            {/* 自定义样式 */}
            <CodeBlock
                code={codeString}
                style={{ borderRadius: 5, backgroundColor: '#242c46ff' }}
                className="custom-code"
            />
        </div>
    );
};

export default App;`;

  return (
    <>
      <Section title="基础用法" badge="代码高亮">
        <View className="demo-box">
          <CodeBlock code={basicCode} />
        </View>
      </Section>
      <Section title="自定义样式">
        <View className="demo-box">
          <CodeBlock
            code={customCode}
            style={{ borderRadius: '5PX', backgroundColor: '#242c46ff' }}
            className="custom-code"
          />
        </View>
      </Section>
      <View className="usage-block">
        <Text className="usage-label">使用示例</Text>
        <CodeBlock code={usageCode} style={{ borderRadius: '0 20PX 20PX 20PX' }} />
      </View>
      <Api rows={[['code', '代码字符串，必填', 'string'], ['style', '自定义样式', 'CSSProperties'], ['className', '自定义类名', 'string']]} />
    </>
  );
}

interface TableDemoRow extends Record<string, unknown> {
  key: string;
  name: string;
  island: string;
  fruit: string;
  hobby: string;
  bells: number;
}

function TableDemo() {
  const [striped, setStriped] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('未选择');

  const rows: TableDemoRow[] = [
    { key: '1', name: '茉莉', island: '枫糖湾', fruit: '苹果', hobby: '音乐', bells: 1280 },
    { key: '2', name: '寒冰', island: '雪帽岛', fruit: '橘子', hobby: '运动', bells: 960 },
    { key: '3', name: '小鹿', island: '杉木湾', fruit: '梨子', hobby: '阅读', bells: 1540 },
    { key: '4', name: '番茄', island: '晴沙岛', fruit: '桃子', hobby: '野餐', bells: 1120 }
  ];

  const columns: TableColumn<TableDemoRow>[] = [
    { title: '居民', dataIndex: 'name', width: 170 },
    { title: '岛屿', dataIndex: 'island', width: 210 },
    { title: '水果', dataIndex: 'fruit', width: 150 },
    {
      title: '爱好',
      dataIndex: 'hobby',
      width: 160,
      render: (value) => <Text className="table-tag">{String(value)}</Text>
    },
    { title: '铃钱', dataIndex: 'bells', width: 150, align: 'right' }
  ];

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <>
      <Section title="基础表格" badge={striped ? '斑马纹' : '普通'}>
        <View className="demo-row">
          <Button type={striped ? 'primary' : 'dashed'} onClick={() => setStriped((value) => !value)}>
            切换斑马纹
          </Button>
          <Button type="primary" loading={loading} disabled={loading} onClick={handleLoading}>
            模拟加载
          </Button>
        </View>
        <View className="table-demo-wrap">
          <Table
            columns={columns}
            dataSource={rows}
            striped={striped}
            loading={loading}
            scroll={{ x: 840 }}
            onRowClick={(record) => setSelected(record.name)}
          />
        </View>
        <Text className="hint">当前选中：{selected}</Text>
      </Section>

      <Section title="空状态和无表头">
        <View className="demo-col">
          <Table columns={columns.slice(0, 3)} dataSource={[]} emptyText="暂无岛屿记录" />
          <Table columns={columns.slice(0, 3)} dataSource={rows.slice(0, 2)} showHeader={false} striped={false} />
        </View>
      </Section>

      <Code>{"import { Table } from '@animal-island-ui/taro';\n<Table columns={columns} dataSource={rows} scroll={{ x: 840 }} />"}</Code>
      <Api rows={[['columns', '列配置', 'TableColumn[]'], ['dataSource', '行数据', 'Record<string, unknown>[]'], ['scroll', '横向 / 纵向滚动尺寸', '{ x?: number | string; y?: number | string }'], ['onRowClick', '行点击回调', '(record, index) => void']]} />
    </>
  );
}

function TypewriterDemo() {
  const [replayKey, setReplayKey] = useState(0);
  const [doneCount, setDoneCount] = useState(0);

  return (
    <>
      <Section title="基础播放" badge={`完成 ${doneCount}`}>
        <View className="demo-col">
          <Text className="hint">
            <Typewriter trigger={replayKey} onDone={() => setDoneCount((value) => value + 1)}>
              你好，欢迎来到动物岛！今天的公告牌已经准备好了，可以写下新的岛民笔记。
            </Typewriter>
          </Text>
          <Button type="primary" onClick={() => setReplayKey((value) => value + 1)}>
            重新播放
          </Button>
        </View>
      </Section>

      <Section title="嵌套内容">
        <View className="demo-col">
          <Text className="hint">
            <Typewriter speed={40} trigger={replayKey}>
              保留外层句子、<Text className="table-tag">带样式片段</Text>，以及内联 Taro Text 节点的结构。
            </Typewriter>
          </Text>
          <Text className="hint">
            <Typewriter autoPlay={false}>
              autoPlay=false 会立即显示全部内容，适合静态文本或服务端返回的内容。
            </Typewriter>
          </Text>
        </View>
      </Section>

      <Code>{"import { Typewriter } from '@animal-island-ui/taro';\n<Typewriter speed={60} trigger={replayKey} onDone={handleDone}>你好，动物岛</Typewriter>"}</Code>
      <Api rows={[['speed', '字符之间的播放间隔，单位毫秒', 'number'], ['trigger', '外部重播标记；变化后重新播放', 'unknown'], ['autoPlay', '是否从头播放动画', 'boolean'], ['onDone', '播放完成后触发一次', '() => void']]} />
    </>
  );
}

function ComponentPage({ active }: { active: PageKey }) {
  const Demo = useMemo(() => ({ title: TitleDemo, button: ButtonDemo, input: InputDemo, switch: SwitchDemo, card: CardDemo, modal: ModalDemo, divider: DividerDemo, icon: IconDemo, checkbox: CheckboxDemo, radio: RadioDemo, collapse: CollapseDemo, codeblock: CodeBlockDemo, table: TableDemo, typewriter: TypewriterDemo, home: () => null })[active], [active]);
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
