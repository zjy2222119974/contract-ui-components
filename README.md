# @contract/ui-components

Contract 共享 UI 组件库

## 📦 安装

```bash
npm install @contract/ui-components
# 或
yarn add @contract/ui-components
```

## 🚀 使用

```tsx
import { TabPanelEnhanced, CardContainer, ProductCard } from '@contract/ui-components'

// 使用增强版 TabPanel
<TabPanelEnhanced<ProductData>
  dataSets={productDataSets}
  renderItem={(item) => (
    <ProductCard {...item} />
  )}
/>
```

## 📚 组件列表

### 容器组件
- `CardContainer` - 卡片容器，支持手势交互
- `TabPanelEnhanced` - 增强版标签面板，支持泛型渲染

### 卡片组件
- `ProductCard` - 产品卡片
- `WorkCard` - 作品卡片
- `OrderItem` - 订单项

### 导航组件
- `TopNavBar` - 顶部导航栏
- `TopNavBarNormal` - 普通导航栏

### 交互组件
- `Button` - 自定义按钮
- `SearchBar` - 搜索栏
- `ActionSheet` - 操作面板

### 工具函数
- `globalState` - 全局状态管理
- `GestureHandler` - 手势处理工具

## 🔧 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 发布
npm publish
```

## 📄 License

MIT