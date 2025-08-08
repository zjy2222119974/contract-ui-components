# @zjy2222119974/ui-components

Contract 共享 UI 组件库 - 专为 Taro + React 小程序开发设计

## 📦 安装

```bash
npm install @zjy2222119974/ui-components
# 或
yarn add @zjy2222119974/ui-components
```

## 🚀 快速开始

### 基础使用

```tsx
import { TabPanelEnhanced, CardContainer, ProductCard } from '@zjy2222119974/ui-components'

// 使用增强版 TabPanel
<TabPanelEnhanced<ProductData>
  dataSets={productDataSets}
  renderItem={(item) => (
    <ProductCard {...item} />
  )}
/>
```

### 样式引入

```tsx
// 在项目中引入样式文件
import '@zjy2222119974/ui-components/styles/index.scss'
```

## 📚 组件详细文档

### 容器组件

#### CardContainer - 卡片容器

支持手势交互的卡片容器，常用于商品列表页面。

**属性说明：**

```tsx
interface CardContainerProps {
  /** 头部内容，通常为 TabTitle 组件 */
  header?: ReactNode
  /** 内容区域，通常为 TabPanelEnhanced 组件 */
  content?: ReactNode
  /** 子组件，当 type=2 时使用 */
  child?: ReactNode
  /** 是否禁用滑动，默认 false */
  disabled?: boolean
  /** 容器高度（px单位），默认根据屏幕高度计算 */
  containerHeight?: number
  /** 滑动距离（rpx单位），默认根据设计稿计算 */
  slideDistance?: number
  /** 初始高度 */
  initialHeight?: number
  /** 展开回调函数 */
  onExpand?: () => void
  /** 样式类型，1为默认（tab-title + tabpanel），2为无header/content仅样式容器 */
  type?: number
  /** 列数，控制product-grid的grid-template-columns，默认2 */
  column?: number
}
```

**使用示例：**

```tsx
import { CardContainer, TabTitle, TabPanelEnhanced } from '@zjy2222119974/ui-components'

const MyPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  return (
    <CardContainer
      header={<TabTitle tabData={tabData} currentIndex={currentIndex} onTabChange={setCurrentIndex} />}
      content={
        <TabPanelEnhanced
          dataSets={productDataSets}
          renderItem={(item) => <ProductCard {...item} />}
          currentIndex={currentIndex}
          onTabChange={setCurrentIndex}
        />
      }
      onExpand={() => console.log('展开')}
    />
  )
}
```

#### TabPanelEnhanced - 增强版标签面板

支持泛型渲染的标签面板，支持水平滑动切换。

**属性说明：**

```tsx
interface TabPanelEnhancedProps<T extends BaseDataItem = BaseDataItem> {
  /** 数据集，二维数组，每个元素代表一个分类的数据列表 */
  dataSets: T[][]
  /** 渲染函数，用于渲染每个数据项 */
  renderItem: RenderFunction<T>
  /** 展开回调函数，当内容向上滚动时触发 */
  onExpand?: () => void
  /** 当前选中的标签索引 */
  currentIndex?: number
  /** 标签切换回调 */
  onTabChange?: (index: number) => void
  /** 网格列数，默认为2 */
  column?: number
  /** 自定义容器类名 */
  className?: string
  /** 自定义样式 */
  style?: React.CSSProperties
  /** 是否启用水平滑动切换，默认true */
  enableSwipe?: boolean
  /** 滑动切换的阈值（相对于容器宽度的比例），默认0.2 */
  swipeThreshold?: number
}

// 基础数据项接口
interface BaseDataItem {
  id: string | number
  [key: string]: any
}

// 渲染函数类型
type RenderFunction<T extends BaseDataItem> = (
  item: T, 
  index: number, 
  dataSetIndex: number
) => ReactNode
```

**使用示例：**

```tsx
interface ProductData extends BaseDataItem {
  title: string
  price: number
  imageUrl: string
  studio: string
}

const productDataSets: ProductData[][] = [
  [
    { id: 1, title: '商品1', price: 99.99, imageUrl: 'url1', studio: '工作室1' },
    { id: 2, title: '商品2', price: 199.99, imageUrl: 'url2', studio: '工作室2' }
  ],
  [
    { id: 3, title: '商品3', price: 299.99, imageUrl: 'url3', studio: '工作室3' }
  ]
]

<TabPanelEnhanced<ProductData>
  dataSets={productDataSets}
  renderItem={(item, index, dataSetIndex) => (
    <ProductCard
      key={item.id}
      {...item}
      onClick={() => handleProductClick(item)}
    />
  )}
  currentIndex={currentIndex}
  onTabChange={setCurrentIndex}
  column={2}
  enableSwipe={true}
  swipeThreshold={0.2}
/>
```

### 卡片组件

#### ProductCard - 产品卡片

支持多种样式的产品展示卡片。

**属性说明：**

```tsx
interface ProductCardProps {
  /** 产品id */
  id?: string
  /** 卡片类型，1-默认样式，2-带购物车按钮，3-带统计信息，5-预付样式 */
  type?: number
  /** 商品标题 */
  title: string
  /** 商品价格 */
  price: number
  /** 商品图片URL */
  imageUrl: string
  /** 所属工作室 */
  studio?: string
  /** 浏览量 */
  views?: number
  /** 点赞数 */
  likes?: number
  /** 是否预付 */
  isPrepaid?: boolean
  /** 点击事件 */
  onClick?: () => void
}
```

**使用示例：**

```tsx
// 默认样式
<ProductCard
  id="1"
  title="精美商品"
  price={99.99}
  imageUrl="https://example.com/image.jpg"
  studio="Monster工作室"
  views={1000}
  likes={50}
  onClick={() => handleProductClick()}
/>

// 带统计信息的样式
<ProductCard
  type={3}
  title="热门商品"
  price={199.99}
  imageUrl="https://example.com/image.jpg"
  views={5000}
  likes={200}
  onClick={() => handleProductClick()}
/>

// 预付样式
<ProductCard
  type={5}
  title="预付商品"
  price={299.99}
  imageUrl="https://example.com/image.jpg"
  isPrepaid={true}
  views={10000}
  likes={500}
  onClick={() => handleProductClick()}
/>
```

#### WorkCard - 作品卡片

用于展示作品信息的卡片组件。

**属性说明：**

```tsx
interface WorkCardProps {
  /** 作品图片URL */
  imageUrl: string
  /** 作品标题 */
  title: string
  /** 浏览量 */
  views: number | string
  /** 点赞数 */
  likes: number | string
  /** 卡片类型，默认为1 */
  type?: number
}
```

**使用示例：**

```tsx
<WorkCard
  imageUrl="https://example.com/work.jpg"
  title="精美作品"
  views={1000}
  likes={50}
  type={1}
/>
```

#### OrderItem - 订单项

用于展示订单信息的组件。

**属性说明：**

```tsx
interface OrderItemProps {
  order: {
    /** 店铺名称 */
    storeName: string
    /** 订单商品列表 */
    items: {
      /** 商品ID */
      id: string
      /** 商品名称 */
      name: string
      /** 商品图片 */
      image: string
      /** 商品规格 */
      specs?: string[]
      /** 商品标签 */
      tags?: string[]
      /** 商品数量 */
      quantity: number
      /** 商品价格 */
      price: number
    }[]
  }
  /** 点击事件 */
  onClick?: () => void
}
```

**使用示例：**

```tsx
const orderData = {
  storeName: "Monster工作室",
  items: [
    {
      id: "1",
      name: "精美商品",
      image: "https://example.com/image.jpg",
      specs: ["规格1", "规格2"],
      tags: ["标签1", "标签2"],
      quantity: 2,
      price: 99.99
    }
  ]
}

<OrderItem order={orderData} onClick={() => handleOrderClick()} />
```

#### AnchorCard - 主播卡片

用于展示主播信息的卡片组件。

**属性说明：**

```tsx
interface AnchorCardProps {
  /** 头像URL */
  avatarUrl?: string
  /** 昵称 */
  nickname: string
  /** 粉丝数 */
  fans: number | string
  /** 账号 */
  account: string
  /** 关注回调 */
  onFollow?: () => void
  /** 点击回调 */
  onClick?: () => void
}
```

**使用示例：**

```tsx
<AnchorCard
  avatarUrl="https://example.com/avatar.jpg"
  nickname="主播昵称"
  fans={10000}
  account="@anchor123"
  onFollow={() => handleFollow()}
  onClick={() => handleClick()}
/>
```

#### ArticleCard - 文章卡片

用于展示文章信息的卡片组件。

**属性说明：**

```tsx
interface ArticleCardProps {
  /** 文章标题 */
  title: string
  /** 作者头像 */
  authorAvatar: string
  /** 作者名称 */
  authorName: string
  /** 发布时间 */
  time: string
  /** 文章图片 */
  imageUrl: string
}
```

**使用示例：**

```tsx
<ArticleCard
  title="文章标题"
  authorAvatar="https://example.com/avatar.jpg"
  authorName="作者名称"
  time="2024-01-01"
  imageUrl="https://example.com/article.jpg"
/>
```

#### CategoryCard - 分类卡片

用于展示分类信息的卡片组件。

**属性说明：**

```tsx
interface CategoryCardProps {
  category: {
    /** 分类名称 */
    name: string
    /** 子分类列表 */
    sub: { name: string }[]
  }
}
```

**使用示例：**

```tsx
const categoryData = {
  name: "主分类",
  sub: [
    { name: "子分类1" },
    { name: "子分类2" },
    { name: "子分类3" }
  ]
}

<CategoryCard category={categoryData} />
```

#### CouponCard - 优惠券卡片

用于展示优惠券信息的卡片组件。

**属性说明：**

```tsx
interface CouponCardProps {
  /** 优惠券ID */
  coupon_id: string
  /** 优惠券类型 */
  coupon_type: string
  /** 优惠券名称 */
  coupon_name: string
  /** 优惠券面值 */
  coupon_value: number
  /** 最低使用金额 */
  min_amount: number
  /** 优惠券描述 */
  description: string
  /** 开始时间 */
  start_time: string
  /** 结束时间 */
  end_time: string
}
```

**使用示例：**

```tsx
<CouponCard
  coupon_id="1"
  coupon_type="discount"
  coupon_name="满减优惠券"
  coupon_value={50}
  min_amount={200}
  description="满200减50"
  start_time="2024-01-01T00:00:00"
  end_time="2024-12-31T23:59:59"
/>
```

#### StudioCard - 工作室卡片

用于展示工作室信息的卡片组件。

**属性说明：**

```tsx
interface StudioCardProps {
  /** 工作室名称 */
  studioName: string
  /** 粉丝数 */
  fansCount: number
  /** 是否已关注 */
  isFollowed: boolean
  /** 类型标签 */
  typeLabel: string
  /** 点赞数 */
  likeCount: number
  /** 销量 */
  salesCount: number
  /** 工作室ID */
  studioId?: string
}
```

**使用示例：**

```tsx
<StudioCard
  studioName="Monster工作室"
  fansCount={10000}
  isFollowed={false}
  typeLabel="原创"
  likeCount={5000}
  salesCount={1000}
  studioId="1"
/>
```

### 导航组件

#### TopNavBar - 顶部导航栏

支持多种主题的顶部导航栏。

**属性说明：**

```tsx
interface TopNavBarProps {
  /** 主题颜色，white-白色主题，black-黑色主题，transparent-透明主题 */
  theme?: 'white' | 'black' | 'transparent'
  /** 当前页面索引 */
  index?: number
  /** 页面标题 */
  pageTitle?: string
  /** 主题变化回调 */
  onThemeChange?: () => void
  /** 当前路径 */
  currentPath?: string
}
```

**使用示例：**

```tsx
<TopNavBar
  theme="white"
  pageTitle="首页"
  currentPath="/pages/index/index"
/>
```

#### TopNavBarNormal - 普通导航栏

简化版的顶部导航栏。

**使用示例：**

```tsx
<TopNavBarNormal
  theme="white"
  pageTitle="页面标题"
/>
```

#### TabTitle - 标签标题

用于标签页切换的标题组件。

**属性说明：**

```tsx
interface TabTitleProps {
  /** 标签数据 */
  tabData: Array<{
    /** 标签索引 */
    index: number
    /** 标签标题 */
    title: string
    /** 产品数据 */
    productData: Array<{
      productData: string
      dataSet: Array<{
        id: string
        title: string
        price: number
        imageUrl: string
        studio: string
      }>
    }>
  }>
  /** 当前选中的标签索引 */
  currentIndex?: number
  /** 标签切换回调 */
  onTabChange?: (index: number) => void
  /** 样式类型，1-默认样式，2-简单样式 */
  type?: 1 | 2
  /** 主题颜色，white-白色主题，black-黑色主题 */
  theme?: 'white' | 'black'
}
```

**使用示例：**

```tsx
const tabData = [
  {
    index: 0,
    title: "推荐",
    productData: []
  },
  {
    index: 1,
    title: "热门",
    productData: []
  }
]

<TabTitle
  tabData={tabData}
  currentIndex={currentIndex}
  onTabChange={setCurrentIndex}
  type={1}
  theme="white"
/>
```

### 交互组件

#### Button - 自定义按钮

支持多种样式和尺寸的按钮组件。

**属性说明：**

```tsx
interface ButtonProps {
  /** 按钮类型：primary-主要按钮，default-默认按钮，warn-警告按钮，confirmButton-确认按钮，border-边框按钮，radius-圆角按钮 */
  type?: 'primary' | 'default' | 'warn' | 'confirmButton' | 'border' | 'radius'
  /** 自定义颜色 */
  color?: string
  /** 按钮尺寸：small-27px，medium-40px，large-44px */
  size?: 'small' | 'medium' | 'large'
  /** 按钮文本 */
  text: string
  /** 点击事件 */
  onClick?: () => void
  /** 自定义宽度，如 '128rpx' */
  width?: string
}
```

**使用示例：**

```tsx
// 主要按钮
<Button
  type="primary"
  size="medium"
  text="确认"
  onClick={() => handleConfirm()}
/>

// 自定义样式按钮
<Button
  type="border"
  color="#007AFF"
  size="large"
  text="自定义按钮"
  width="200rpx"
  onClick={() => handleClick()}
/>
```

#### SearchBar - 搜索栏

支持多种主题的搜索栏组件。

**属性说明：**

```tsx
interface SearchBarProps {
  /** 目标URL，点击搜索时跳转 */
  targetURL: string
  /** 主题颜色：white-白色主题，black-黑色主题，transparent-透明主题 */
  theme: 'white' | 'black' | 'transparent'
  /** 搜索回调函数 */
  onSearch: (keyword: string) => Promise<void>
  /** 是否显示搜索按钮，默认true */
  button?: boolean
  /** 占位符文本，默认'随便搜点什么' */
  text?: string
}
```

**使用示例：**

```tsx
// 带搜索按钮的搜索栏
<SearchBar
  targetURL="/pages/search/index"
  theme="white"
  onSearch={async (keyword) => {
    console.log('搜索关键词:', keyword)
    // 执行搜索逻辑
  }}
  button={true}
/>

// 仅占位符的搜索栏
<SearchBar
  targetURL="/pages/search/index"
  theme="transparent"
  onSearch={async (keyword) => {}}
  button={false}
  text="搜索商品"
/>
```

#### ActionSheet - 操作面板

底部弹出的操作面板组件。

**属性说明：**

```tsx
interface ActionSheetProps {
  /** 控制弹窗显示/隐藏 */
  visible: boolean
  /** 点击遮罩或关闭时的回调 */
  onClose: () => void
  /** 弹窗内容 */
  children?: React.ReactNode
  /** 距底距离，默认'0px' */
  bottom?: string
}
```

**使用示例：**

```tsx
const [actionSheetVisible, setActionSheetVisible] = useState(false)

<ActionSheet
  visible={actionSheetVisible}
  onClose={() => setActionSheetVisible(false)}
  bottom="20px"
>
  <View className="action-sheet-content">
    <View className="action-item" onClick={() => handleAction1()}>
      操作1
    </View>
    <View className="action-item" onClick={() => handleAction2()}>
      操作2
    </View>
  </View>
</ActionSheet>
```

#### PopupModal - 弹窗模态框

支持多种类型的弹窗模态框组件。

**属性说明：**

```tsx
interface PopupModalProps {
  /** 控制弹窗显示/隐藏 */
  visible: boolean
  /** 关闭回调 */
  onClose: () => void
  /** 弹窗类型，1-带标题和确认按钮，2-自定义内容 */
  type?: number
  /** 弹窗内容 */
  child?: ReactNode
  /** 弹窗标题 */
  title?: string
  /** 确认回调 */
  onConfirm?: () => void
}
```

**使用示例：**

```tsx
const [modalVisible, setModalVisible] = useState(false)

// 类型1：带标题和确认按钮
<PopupModal
  visible={modalVisible}
  onClose={() => setModalVisible(false)}
  type={1}
  title="确认操作"
  onConfirm={() => {
    console.log('确认操作')
    setModalVisible(false)
  }}
>
  <Text>确认要执行此操作吗？</Text>
</PopupModal>

// 类型2：自定义内容
<PopupModal
  visible={modalVisible}
  onClose={() => setModalVisible(false)}
  type={2}
>
  <View className="custom-modal-content">
    <Text>自定义弹窗内容</Text>
  </View>
</PopupModal>
```

#### CheckBox - 复选框

支持圆形和方形样式的复选框组件。

**属性说明：**

```tsx
interface CheckBoxProps {
  /** 复选框类型：circle-圆形，square-方形 */
  type?: 'circle' | 'square'
  /** 是否选中 */
  checked: boolean
  /** 状态变化回调 */
  onChange?: (checked: boolean) => void
}
```

**使用示例：**

```tsx
const [checked, setChecked] = useState(false)

// 圆形复选框
<CheckBox
  type="circle"
  checked={checked}
  onChange={(newChecked) => setChecked(newChecked)}
/>

// 方形复选框
<CheckBox
  type="square"
  checked={checked}
  onChange={(newChecked) => setChecked(newChecked)}
/>
```

#### FilterBar - 筛选栏

用于筛选条件的筛选栏组件。

**属性说明：**

```tsx
interface FilterBarProps {
  /** 过滤条件数组 */
  filterConditions: string[]
  /** 主题颜色：white-白色主题，black-黑色主题，transparent-透明主题 */
  theme?: 'white' | 'black' | 'transparent'
  /** 过滤条件改变的回调 */
  onFilterChange?: (condition: string) => void
}
```

**使用示例：**

```tsx
const filterConditions = ['全部', '价格', '销量', '好评']

<FilterBar
  filterConditions={filterConditions}
  theme="white"
  onFilterChange={(condition) => {
    console.log('选择的筛选条件:', condition)
    // 执行筛选逻辑
  }}
/>
```

### 展示组件

#### Banner - 轮播图

支持自动播放的轮播图组件。

**属性说明：**

```tsx
interface BannerItem {
  /** 图片URL */
  url: string
  /** 文字颜色 */
  textColor?: string
}

interface BannerProps {
  /** 轮播图数据 */
  items: BannerItem[]
  /** 自定义样式 */
  style?: CSSProperties
}
```

**使用示例：**

```tsx
const bannerItems = [
  {
    url: "https://example.com/banner1.jpg",
    textColor: "#FFFFFF"
  },
  {
    url: "https://example.com/banner2.jpg",
    textColor: "#000000"
  }
]

<Banner
  items={bannerItems}
  style={{ height: '300rpx' }}
/>
```

#### FeatureButtons - 功能按钮组

用于展示功能按钮的组件。

**属性说明：**

```tsx
interface FeatureButton {
  /** 按钮标题 */
  title: string
  /** 按钮图标类名 */
  icon?: string
  /** 按钮链接地址 */
  url?: string
  /** 按钮点击事件 */
  onClick?: () => void
  /** 按钮是否禁用 */
  disabled?: boolean
  /** 按钮是否加载中 */
  loading?: boolean
  /** 按钮类型 */
  type?: 'primary' | 'secondary' | 'text'
  /** 按钮大小 */
  size?: 'small' | 'medium' | 'large'
  /** 按钮自定义样式 */
  style?: React.CSSProperties
  /** 按钮自定义类名 */
  className?: string
  /** 按钮是否显示 */
  visible?: boolean
  /** 按钮是否选中 */
  selected?: boolean
}

interface FeatureButtonsProps {
  /** 按钮数组 */
  buttons: FeatureButton[]
  /** 自定义样式 */
  style?: CSSProperties
}
```

**使用示例：**

```tsx
const featureButtons = [
  {
    title: "功能1",
    icon: "icon-feature1",
    onClick: () => console.log('功能1')
  },
  {
    title: "功能2",
    icon: "icon-feature2",
    url: "/pages/feature2/index"
  }
]

<FeatureButtons
  buttons={featureButtons}
  style={{ padding: '20rpx' }}
/>
```

#### CartStore - 购物车店铺

用于展示购物车中店铺商品的组件。

**属性说明：**

```tsx
interface CartItem {
  /** 商品ID */
  id: string
  /** 商品名称 */
  name: string
  /** 商品图片 */
  image: string
  /** 商品规格 */
  specs: string[]
  /** 商品标签 */
  tags: string[]
  /** 商品数量 */
  quantity: number
  /** 商品价格 */
  price: number
  /** 是否选中 */
  selected: boolean
  /** 选择回调 */
  onSelect?: () => void
  /** 是否显示复选框 */
  checkBox?: boolean
}

interface CartStoreProps {
  /** 店铺名称 */
  name: string
  /** 商品列表 */
  items: CartItem[]
  /** 店铺是否全选 */
  selected: boolean
  /** 店铺选择回调 */
  onSelect: (selected: boolean) => void
  /** 总价格变化回调 */
  onTotalPriceChange?: (totalPrice: number) => void
  /** 是否显示复选框 */
  checkBox?: boolean
}
```

**使用示例：**

```tsx
const cartItems = [
  {
    id: "1",
    name: "商品1",
    image: "https://example.com/image1.jpg",
    specs: ["规格1"],
    tags: ["标签1"],
    quantity: 2,
    price: 99.99,
    selected: true
  }
]

<CartStore
  name="Monster工作室"
  items={cartItems}
  selected={true}
  onSelect={(selected) => console.log('店铺选择:', selected)}
  onTotalPriceChange={(totalPrice) => console.log('总价格:', totalPrice)}
  checkBox={true}
/>
```

#### UserItem - 用户项

用于展示用户信息的组件。

**属性说明：**

```tsx
interface UserItemProps {
  item: {
    /** 用户名称 */
    name: string
    /** 更新信息 */
    update?: string
  }
  /** 索引 */
  idx: number
}
```

**使用示例：**

```tsx
const userData = {
  name: "用户名",
  update: "更新了头像"
}

<UserItem item={userData} idx={0} />
```

#### BottomIndicator - 底部指示器

用于适配不同设备底部安全区域的组件。

**属性说明：**

```tsx
interface BottomIndicatorProps {
  /** 背景颜色，默认白色 */
  backgroundColor?: string
}
```

**使用示例：**

```tsx
<BottomIndicator backgroundColor="#F5F5F5" />
```

#### HomepageBackground - 首页背景

用于首页背景展示的组件。

**使用示例：**

```tsx
<HomepageBackground />
```

## 🛠️ 工具函数

### globalState - 全局状态管理

提供系统信息、导航栏高度等全局状态管理功能。

**主要方法：**

```tsx
// 获取状态栏高度
globalState.getStatusBarHeight(): number

// 获取窗口高度
globalState.getWindowHeight(): number

// 获取窗口宽度
globalState.getWindowWidth(): number

// 获取导航栏高度
globalState.getNavigationBarHeight(): number

// 获取胶囊按钮高度
globalState.getMenuButtonHeight(): number

// 获取胶囊按钮顶部距离
globalState.getMenuButtonTop(): number

// 获取胶囊按钮宽度
globalState.getMenuButtonWidth(): number

// 获取顶部边距高度
globalState.getMarginTopHeight(): number

// rpx转px
globalState.rpxToPx(rpx: number): number

// 获取底部指示器高度
globalState.getBottomIndicatorHeight(): number

// 设置白色胶囊按钮
globalState.setWhiteCapsule(): void

// 设置黑色胶囊按钮
globalState.setBlackCapsule(): void

// 设置当前tab索引
globalState.setCurrentTabIndex(index: number): void

// 获取当前tab索引
globalState.getCurrentTabIndex(): number
```

**React Hook 使用：**

```tsx
import { useGlobalState } from '@zjy2222119974/ui-components'

const MyComponent = () => {
  const {
    statusBarHeight,
    windowHeight,
    navigationBarHeight,
    marginTopHeight
  } = useGlobalState()

  return (
    <View style={{ marginTop: `${marginTopHeight}px` }}>
      内容区域
    </View>
  )
}
```

### GestureHandler - 手势处理工具

提供手势识别和处理功能。

**类型定义：**

```tsx
type SwipeDirection = 'up' | 'down' | 'left' | 'right'

interface SwipeResult {
  direction: SwipeDirection
  distance: number
}
```

**使用示例：**

```tsx
import { GestureHandler } from '@zjy2222119974/ui-components'

const MyComponent = () => {
  const gestureHandler = useRef(new GestureHandler())

  const handleTouchStart = (e: any) => {
    gestureHandler.current.handleTouchStart(e)
  }

  const handleTouchMove = (e: any) => {
    gestureHandler.current.handleTouchMove(e)
  }

  const handleTouchEnd = () => {
    const result = gestureHandler.current.handleTouchEnd()
    if (result) {
      console.log('滑动方向:', result.direction)
      console.log('滑动距离:', result.distance)
    }
  }

  return (
    <View
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      手势识别区域
    </View>
  )
}
```

## 🎨 样式系统

### 主题支持

大部分组件支持多种主题：

- `white` - 白色主题（浅色背景）
- `black` - 黑色主题（深色背景）
- `transparent` - 透明主题

### 响应式设计

组件库使用 rpx 单位进行响应式设计，自动适配不同屏幕尺寸。

### 自定义样式

所有组件都支持通过 `className` 和 `style` 属性进行样式自定义。

## 🔧 开发指南

### 项目结构

```
src/
├── components/          # 组件目录
│   ├── card-container/  # 卡片容器
│   ├── tab-panel-enhanced/ # 增强版标签面板
│   ├── product-card/    # 产品卡片
│   └── ...             # 其他组件
├── utils/              # 工具函数
│   ├── globalState.ts  # 全局状态管理
│   └── gesture.ts      # 手势处理
├── styles/             # 样式文件
│   ├── index.scss      # 主样式文件
│   ├── variables.scss  # 变量定义
│   └── mixins.scss     # 混入样式
└── index.ts           # 导出文件
```

### 构建命令

```bash
# 安装依赖
npm install

# 开发模式（监听文件变化）
npm run dev

# 构建库文件
npm run build

# 清理构建文件
npm run clean

# 发布前构建
npm run prepublishOnly
```

### 类型定义

所有组件都提供完整的 TypeScript 类型定义，支持智能提示和类型检查。

### 最佳实践

1. **组件组合使用**：推荐使用 `CardContainer` + `TabTitle` + `TabPanelEnhanced` 的组合来构建商品列表页面。

2. **手势处理**：使用 `GestureHandler` 来处理复杂的手势交互。

3. **全局状态**：使用 `useGlobalState` Hook 来获取系统信息，确保组件在不同设备上的兼容性。

4. **样式主题**：根据页面背景选择合适的主题，确保良好的视觉体验。

5. **性能优化**：对于大量数据的渲染，建议使用虚拟滚动或分页加载。

## 📄 License

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个组件库。

## 📞 支持

如有问题，请通过以下方式联系：

- 提交 GitHub Issue
- 发送邮件至项目维护者

---

**注意**：本组件库专为 Taro + React 小程序开发设计，请确保在正确的环境中使用。