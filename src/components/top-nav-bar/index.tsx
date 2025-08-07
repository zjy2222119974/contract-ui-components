// React 和 Taro 核心库
import { View, Text } from '@tarojs/components'
import { navigateTo, getCurrentPages, switchTab } from '@tarojs/taro'
import { useEffect } from 'react'

// 样式文件
import './index.scss'

// 工具函数
import globalState from '../../utils/globalState'

// 配置
// import { navItems } from '../../custom-tab-bar/config'

interface TopNavBarProps {
  theme?: 'white' | 'black' | 'transparent'
  index?: number
  pageTitle?: string
  onThemeChange?: () => void
  currentPath?: string
}

const TopNavBar: React.FC<TopNavBarProps> = ({
  theme = 'white',
  index = 0,
  pageTitle = '',
  onThemeChange,
  currentPath
}) => {
  // 使用useEffect监听theme变化并设置胶囊颜色
  useEffect(() => {
    if (theme === 'white') {
      globalState.setBlackCapsule();
    } else {
      // 黑色和透明主题使用白色胶囊
      globalState.setWhiteCapsule();
    }
  }, [theme]);

  const menuButtonHeight = globalState.getMenuButtonHeight()
  const menuButtonTop = globalState.getMenuButtonTop()
  const menuButtonWidth = globalState.getMenuButtonWidth()
  const statusBarHeight = globalState.getStatusBarHeight()
  const navigationBarHeight = globalState.getNavigationBarHeight()

  // 根据 index 获取标题
  // const pageTitle = navItems[index]?.text || 'CONTRACT'      
  const title = pageTitle || 'CONTRACT'

  // 处理 logo 按钮点击
  const handleLogoClick = () => {
    // 获取当前页面路径
    const pages = getCurrentPages()
    const currentPage = pages && pages.length > 0 ? pages[pages.length - 1] : null
    const path = currentPath || (currentPage ? currentPage.route : '') || ''
    
    // 如果当前不是 index 页面，则跳转到 index 页面
    if (path !== 'pages/index/index') {
      globalState.setCurrentTabIndex(2);
      switchTab({
        url: '/pages/index/index'
      }).catch(() => {
        // 如果 switchTab 失败，尝试使用 navigateTo
        navigateTo({
          url: '/pages/index/index'
        }).catch(err => {
          console.error('Navigation failed:', err)
        })
      })
    }
  }

  const handleSearchClick = () => {
    // 获取当前页面路径
    const pages = getCurrentPages()
    const currentPage = pages && pages.length > 0 ? pages[pages.length - 1] : null
    const path = currentPath || (currentPage ? currentPage.route : '') || ''

    // 根据当前路径判断跳转到哪个搜索页面
    let searchPath = '/pages/search/index' // 默认搜索页面

    if (path.includes('home')) {
      searchPath = '/pages/search/home-search'
    } else if (path.includes('shop')) {
      searchPath = '/pages/search/shop-search'
    } else if (path.includes('cart')) {
      searchPath = '/pages/search/cart-search'
    } else if (path.includes('profile')) {
      searchPath = '/pages/search/profile-search'
    }

    navigateTo({
      url: searchPath
    })
  }

  return (
    <View
      className={`nav-bar-wrapper ${theme}`}
      style={{
        height: `${statusBarHeight + navigationBarHeight}px`
      }}
    >
      <View
        className={`top-nav-bar-container ${theme}`}
        style={{
          marginTop: `${menuButtonTop}px`
        }}
      >
        <View
          className={`nav-content ${theme}`}
          style={{
            height: `${menuButtonHeight}px`
          }}
        >

          <View
            className='nav-buttons'
            style={{
              height: `${menuButtonHeight}px`,
              width: `${menuButtonWidth}px`
            }}
          >

            <View className='nav-button home-button' onClick={handleLogoClick}>
              <View className='iconfont icon-logo-nav-button'></View>
            </View>
            <View className='divider' />

            <View className='nav-button nav-search-btn' onClick={handleSearchClick}>
              <View className='iconfont icon-search-nav-button'></View>
            </View>

          </View>
          <Text className='title-text'>{title}</Text>
          <View className='nav-buttons-placeholder'
            style={{
              height: `${menuButtonHeight}px`,
              width: `${menuButtonWidth}px`
            }} />
        </View>
      </View>
    </View>
  )
}

export default TopNavBar 