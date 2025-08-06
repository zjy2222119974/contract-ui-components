# 组件迁移指南

## 📋 迁移步骤

### 1. 完成组件包构建

```bash
cd ../contract-ui-components
npm install
npm run build
```

### 2. 发布组件包

#### 选项A: 发布到 GitHub Packages（推荐）

```bash
# 登录 GitHub npm registry
npm login --registry=https://npm.pkg.github.com

# 发布
npm publish
```

#### 选项B: 发布到私有 npm registry

```bash
# 配置私有 registry
npm config set registry https://your-private-registry.com

# 发布
npm publish
```

### 3. 在项目中安装组件包

```bash
cd taroapp-contract
npm install @contract/ui-components

# 如果使用 GitHub Packages，需要配置 .npmrc
echo "@contract:registry=https://npm.pkg.github.com" >> .npmrc
```

### 4. 更新 Home 页面使用新组件包

```tsx
// 替换导入
import { TabPanelEnhanced } from '@contract/ui-components'

// 使用方式保持不变
<TabPanelEnhanced<ProductData>
  dataSets={productDataSets}
  renderItem={(item) => (
    <ProductCard {...item} />
  )}
/>
```

## 🔧 需要手动复制的组件

由于时间限制，以下组件需要手动复制到组件包中：

### 核心组件
- [ ] `CardContainer` - 已有接口定义
- [ ] `ProductCard` - 产品卡片
- [ ] `WorkCard` - 作品卡片  
- [ ] `OrderItem` - 订单项
- [ ] `Button` - 自定义按钮
- [ ] `TopNavBar` / `TopNavBarNormal` - 导航栏

### 复制步骤模板

对于每个组件，执行以下步骤：

1. **创建组件目录**
   ```bash
   mkdir ../taroapp-ui-components/src/components/[component-name]
   ```

2. **复制文件**
   ```bash
   cp src/components/[component-name]/* ../taroapp-ui-components/src/components/[component-name]/
   ```

3. **更新导入路径**
   - 将 `../../utils/globalState` 改为 `../../utils/globalState`
   - 将 `../../utils/gesture` 改为 `../../utils/gesture`

4. **更新导出**
   在 `../taroapp-ui-components/src/index.ts` 中添加：
   ```tsx
   export { default as [ComponentName] } from './components/[component-name]'
   export type { [ComponentName]Props } from './components/[component-name]'
   ```

## 🎯 快速迁移脚本

创建 `copy-components.sh` 脚本：

```bash
#!/bin/bash

COMPONENTS=(
  "card-container"
  "product-card"
  "work-card"
  "order-item"
  "button"
  "top-nav-bar"
  "top-nav-bar-normal"
  "search-bar"
  "banner"
  "feature-buttons"
  "actionsheet"
)

for component in "${COMPONENTS[@]}"; do
  echo "Copying $component..."
  mkdir -p "../taroapp-ui-components/src/components/$component"
  cp -r "src/components/$component/"* "../taroapp-ui-components/src/components/$component/"
done

echo "All components copied!"
```

## 📝 更新现有项目

### Home 页面已完成迁移
- ✅ 已更新为使用 `TabPanelEnhanced`
- ✅ 已定义 `ProductData` 接口
- ✅ 已实现渲染函数

### 其他页面迁移
对于其他使用了组件的页面，按以下模式更新：

```tsx
// 旧的导入方式
import TabPanel from '../../components/tab-panel'
import ProductCard from '../../components/product-card'

// 新的导入方式  
import { TabPanelEnhanced, ProductCard } from '@contract/ui-components'

// 旧的使用方式
<TabPanel 
  child="ProductCard"
  productDataSets={data}
/>

// 新的使用方式
<TabPanelEnhanced<ProductData>
  dataSets={data}
  renderItem={(item) => <ProductCard {...item} />}
/>
```

## 🚀 优势总结

### 1. 完全类型安全
- 泛型支持确保数据类型一致
- TypeScript 类型导出

### 2. 无限扩展性
- 渲染函数模式支持任意组件
- 不再局限于固定的组件类型

### 3. 版本管理
- 独立版本控制
- 便于多项目共享

### 4. 开发体验
- 统一的组件 API
- 完整的 TypeScript 支持
- 详细的文档和示例

## 🔍 测试验证

迁移完成后，验证以下功能：

- [ ] TabPanelEnhanced 正常渲染
- [ ] 滑动切换功能正常
- [ ] 产品卡片点击事件正常
- [ ] 样式显示正确
- [ ] TypeScript 类型检查通过

## 📞 技术支持

如有问题，请检查：
1. 组件包是否正确安装
2. 导入路径是否正确
3. 数据类型是否匹配
4. 样式文件是否正确导入