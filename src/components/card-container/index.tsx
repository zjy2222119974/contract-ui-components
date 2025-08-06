import React, { ReactNode, useState, CSSProperties, useRef, useEffect } from 'react'
import { View, ScrollView } from '@tarojs/components'

// 样式文件
import './index.scss'

// 工具和全局状态
import globalState, { useGlobalState } from '../../utils/globalState'
import { GestureHandler } from '../../utils/gesture'

export interface CardContainerProps {
  /** 头部内容 */
  header?: ReactNode
  /** 内容区域 */
  content?: ReactNode
  /** 子组件 */
  child?: ReactNode
  /** 是否禁用滑动 */
  disabled?: boolean
  /** 容器高度（px单位），默认根据屏幕高度计算 */
  containerHeight?: number
  /** 滑动距离（rpx单位），默认根据设计稿计算 */
  slideDistance?: number
  initialHeight?: number
  onExpand?: () => void
  /** 样式类型，1为默认，2为无header/content，仅样式容器 */
  type?: number
  /** 列数，控制product-grid的grid-template-columns，默认2 */
  column?: number
}

const CardContainer: React.FC<CardContainerProps> = ({
  header,
  content,
  child,
  disabled = false,
  containerHeight: propContainerHeight,
  slideDistance: propSlideDistance,
  onExpand,
  type = 1,      //1时为tab-title + tabpanel的模式，2时只需要传入个child的View即可
  column = 2,
}) => {
  // 从globalState获取系统信息
  const { statusBarHeight = 0, windowHeight = 0, marginTopHeight = 0 } = useGlobalState()

  // 计算容器高度：屏幕高度 - 状态栏高度 - 导航栏高度 - 40rpx - 底部tab-bar高度(112rpx)
  const defaultContainerHeight = windowHeight - marginTopHeight - globalState.rpxToPx(112 + 40 - 4) - globalState.getBottomIndicatorHeight() // 44px为导航栏高度，此处纯px单位；底部导航和空白需要单独设置；
  const containerHeight = propContainerHeight || defaultContainerHeight

  // 计算默认滑动距离（px）
  const defaultSlideDistance = globalState.rpxToPx(750 * 0.75 + 24 + 72 + 24 + 26 + 24 - 40)
  const slideDistance = propSlideDistance || defaultSlideDistance

  const [isExpanded, setIsExpanded] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const gestureHandler = useRef(new GestureHandler())

  // 手势处理函数
  const handleTouchStart = (e: any) => {
    if (disabled) return
    gestureHandler.current.handleTouchStart(e)
  }

  const handleTouchMove = (e: any) => {
    if (disabled) return
    gestureHandler.current.handleTouchMove(e)
  }

  const handleTouchEnd = () => {
    const result = gestureHandler.current.handleTouchEnd()
    if (!result) return

    if (result.direction === 'up') {
      
      setIsExpanded(true)
    } else if (result.direction === 'down') {
      
      setIsExpanded(false)
    }
  }

  // 遮罩层点击处理
  const handleOverlayClick = () => {
    if (isExpanded) {
      setIsExpanded(false)
    }
  }

  // 处理标签页切换
  const handleTabChange = (index: number) => {
    setCurrentIndex(index)
    console.log('CardContainer：当前选中的标签页索引:', index)
  }

  // 计算容器样式
  const containerStyle: CSSProperties = {
    position: 'relative',
    height: `${containerHeight}px`,  // 112rpx为底部导航栏高度，40rpx为空白区域高度,多预留4rpx解决部分机型黑线
    transform: isExpanded ? `translateY(-${slideDistance}px)` : 'translateY(0)',
    transition: 'transform 0.3s ease-out',
    zIndex: 9999
  }

  // 内容容器样式
  const contentStyle: CSSProperties = {
    boxSizing: 'border-box',
  }

  // 遮罩层样式
  const overlayStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9998,
    opacity: isExpanded ? 1 : 0,
    transition: 'opacity 0.3s ease-out',
    pointerEvents: isExpanded ? 'auto' : 'none'
  }



  return (
    <>
      {/* 遮罩层 */}
      <View
        className='overlay'
        style={overlayStyle}
        onClick={handleOverlayClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <View
        className='card-container'
        style={containerStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {type === 1 ? (
          <>
            {/* 头部容器 - 固定在顶部 */}
            <View className='header-container'>
              {React.cloneElement(header as React.ReactElement, {
                currentIndex,
                onTabChange: handleTabChange
              })}
            </View>
            {/* 内容容器 */}
            <View
              className='content-container'
              style={contentStyle}
            >
              {React.cloneElement(content as React.ReactElement, {
                onExpand: () => setIsExpanded(true),
                currentIndex,
                onTabChange: handleTabChange,
                column,
              })}
            </View>
          </>
        ) : (
          <ScrollView
            className="card-container-child"
            scrollY
            enhanced
            showScrollbar={false}
            onScroll={e => {
              if (!isExpanded) {
                // Taro H5: e.detail.scrollTop; 微信小程序同理
                const scrollTop = e.detail ? e.detail.scrollTop : 0;
                if (scrollTop > 0) {
                  setIsExpanded(true);
                }
              }
            }}
          >
            {child}
          </ScrollView>
        )}
      </View>
    </>
  )
}

export default CardContainer 