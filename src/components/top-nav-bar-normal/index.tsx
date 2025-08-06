// React 和 Taro 核心库
import { View, Text } from '@tarojs/components'
import { navigateTo, getCurrentPages, navigateBack, switchTab } from '@tarojs/taro'
import { useEffect } from 'react'

// 样式文件
import './index.scss'

// 工具函数
import globalState from '../../utils/globalState'

// 配置
import { navItems } from '../../custom-tab-bar/config'

interface TopNavBarNormalProps {
  theme?: 'white' | 'black' | 'transparent'
  index?: number
  pageTitle?: string
  onThemeChange?: () => void
  currentPath?: string
}

const TopNavBarNormal: React.FC<TopNavBarNormalProps> = ({
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

  // 使用useEffect观察props的变化
  useEffect(() => {
    console.log('TopNavBarNormal Props Changed:', {
      theme,
      index,
      pageTitle,
      currentPath,
      timestamp: new Date().toISOString()
    })
  }, [theme, index, pageTitle, currentPath])

  const menuButtonHeight = globalState.getMenuButtonHeight()
  const menuButtonTop = globalState.getMenuButtonTop()
  const menuButtonWidth = globalState.getMenuButtonWidth()
  const statusBarHeight = globalState.getStatusBarHeight()

  // 获取导航栏总高度（状态栏高度 + 导航栏高度）
  const getNavBarTotalHeight = (): number => {
    return globalState.getStatusBarHeight() + globalState.getNavigationBarHeight()
  }

  // 根据 index 获取标题
  // const pageTitle = navItems[index] ? navItems[index].text : 'CONTRACT'      
  const title = pageTitle || 'CONTRACT'

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

  // 处理返回按钮点击事件
  const handleReturnClick = () => {
    const pages = getCurrentPages()
    
    // 如果当前只有一个页面或页面栈为空，直接跳转到首页
    if (!pages || pages.length <= 1) {
      switchTab({
        url: '/pages/home/index'
      }).catch(() => {
        // 如果switchTab失败，尝试使用navigateTo
        navigateTo({
          url: '/pages/home/index'
        }).catch(err => {
          console.error('Navigation failed:', err)
        })
      })
      return
    }

    // 尝试返回上一页
    navigateBack({
      delta: 1
    }).catch(() => {
      // 如果返回失败，跳转到首页
      switchTab({
        url: '/pages/home/index'
      }).catch(() => {
        // 如果switchTab失败，尝试使用navigateTo
        navigateTo({
          url: '/pages/home/index'
        }).catch(err => {
          console.error('Navigation failed:', err)
        })
      })
    })
  }

  return (
    <View
      className={`nav-bar-wrapper-normal ${theme}`}
      style={{
        height: `${getNavBarTotalHeight()}px`
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
          <View className='iconfont icon-left-l return-button' onClick={handleReturnClick}></View>
          <Text className='title-text'>{title}</Text>
          <View className='nav-buttons-placeholder' style={{
              height: `${menuButtonHeight}px`,
              width: `48rpx`
            }}/>
        </View>
      </View>
    </View>
  )
}

export default TopNavBarNormal 