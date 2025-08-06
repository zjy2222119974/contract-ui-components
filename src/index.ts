// 容器组件
export { default as CardContainer } from './components/card-container'
export type { CardContainerProps } from './components/card-container'

export { default as TabPanelEnhanced } from './components/tab-panel-enhanced'
export type { TabPanelEnhancedProps, BaseDataItem, RenderFunction } from './components/tab-panel-enhanced'

// 卡片组件
export { default as ProductCard } from './components/product-card'
export type { ProductCardProps } from './components/product-card'

export { default as WorkCard } from './components/work-card'

export { default as OrderItem } from './components/order-item'

export { default as AnchorCard } from './components/anchor-card'

export { default as ArticleCard } from './components/article-card'

export { default as CategoryCard } from './components/category-card'

export { default as CouponCard } from './components/coupon-card'

export { default as StudioCard } from './components/studio-card'

// 导航组件
export { default as TopNavBar } from './components/top-nav-bar'

export { default as TopNavBarNormal } from './components/top-nav-bar-normal'

export { default as TabTitle } from './components/tab-title'

// 交互组件
export { default as Button } from './components/button'

export { default as SearchBar } from './components/search-bar'

export { default as ActionSheet } from './components/actionsheet'

export { default as PopupModal } from './components/popup-modal'

export { default as CheckBox } from './components/checkbox'

export { default as FilterBar } from './components/filter-bar'

// 展示组件
export { default as Banner } from './components/banner'

export { default as FeatureButtons } from './components/feature-buttons'

export { default as BottomIndicator } from './components/bottom-indicator'

export { default as CartStore } from './components/cart-store'

export { default as UserItem } from './components/user-item'

export { default as HomepageBackground } from './components/homepage-background'

// 工具函数
export { default as globalState, useGlobalState } from './utils/globalState'
export { GestureHandler } from './utils/gesture'
export type { SwipeDirection } from './utils/gesture'

// 样式
export './styles/index.scss'