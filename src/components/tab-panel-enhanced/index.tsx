// React 和 Taro 核心库
import { View, ScrollView } from '@tarojs/components'
import { useState, useRef, useEffect, ReactNode } from 'react'

// 样式文件
import './index.scss'

// 工具和全局状态
import { GestureHandler } from '../../utils/gesture'

// 泛型数据项接口
export interface BaseDataItem {
  id: string | number
  [key: string]: any  // 允许额外属性
}

// 渲染函数类型定义
export type RenderFunction<T extends BaseDataItem> = (
  item: T, 
  index: number, 
  dataSetIndex: number
) => ReactNode

// 组件属性接口 - 使用泛型
export interface TabPanelEnhancedProps<T extends BaseDataItem = BaseDataItem> {
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

function TabPanelEnhanced<T extends BaseDataItem = BaseDataItem>({
  dataSets,
  renderItem,
  onExpand,
  currentIndex = 0,
  onTabChange,
  column = 2,
  className = '',
  style = {},
  enableSwipe = true,
  swipeThreshold = 0.2,
}: TabPanelEnhancedProps<T>) {
  // 内部当前显示的面板索引
  const [internalIndex, setInternalIndex] = useState(currentIndex)
  // 容器引用，用于获取容器宽度
  const containerRef = useRef<HTMLDivElement>(null)
  // 手势处理器实例，用于处理水平滑动
  const gestureHandler = useRef(new GestureHandler())
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimer = useRef<NodeJS.Timeout | null>(null)

  // 监听外部 currentIndex 变化
  useEffect(() => {
    setInternalIndex(currentIndex)
  }, [currentIndex])

  // 水平滑动处理函数
  const handleHorizontalTouchStart = (e: any) => {
    if (!enableSwipe) return
    gestureHandler.current.handleTouchStart(e)
  }

  const handleHorizontalTouchMove = (e: any) => {
    if (!enableSwipe) return
    gestureHandler.current.handleTouchMove(e)
  }

  const handleHorizontalTouchEnd = () => {
    if (!enableSwipe) return
    
    const result = gestureHandler.current.handleTouchEnd()
    if (!result) return
    
    const containerWidth = (containerRef.current && containerRef.current.offsetWidth) || 0
    
    // 判断滑动距离是否超过设定阈值
    if (result.distance > containerWidth * swipeThreshold) {
      if (result.direction === 'right' && internalIndex > 0) {
        const newIndex = internalIndex - 1
        setInternalIndex(newIndex)
        onTabChange?.(newIndex)
      } else if (result.direction === 'left' && internalIndex < dataSets.length - 1) {
        const newIndex = internalIndex + 1
        setInternalIndex(newIndex)
        onTabChange?.(newIndex)
      }
    }
  }

  // 垂直滚动处理函数
  const handleScroll = (e: any) => {
    if (e.detail.scrollTop > 0 && onExpand) {
      onExpand()
    }

    setIsScrolling(true)
    setHasScrolled(e.detail.scrollTop > 0)

    if (scrollTimer.current) {
      clearTimeout(scrollTimer.current)
    }

    scrollTimer.current = setTimeout(() => {
      setIsScrolling(false)
      setHasScrolled(false)
    }, 150)
  }

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current)
      }
    }
  }, [])

  // 计算容器样式
  const containerStyle: React.CSSProperties = {
    transform: `translateX(-${internalIndex * 100}%)`,
    transition: 'transform 0.3s ease-out',
    ...style
  }

  return (
    <View className={`tab-panel-enhanced ${isScrolling && hasScrolled ? 'has-shadow' : ''} ${className}`}>
      {/* 外层容器，处理水平滑动 */}
      <View 
        className='panel-container'
        style={containerStyle}
        ref={containerRef}
        onTouchStart={handleHorizontalTouchStart}
        onTouchMove={handleHorizontalTouchMove}
        onTouchEnd={handleHorizontalTouchEnd}
      >
        {/* 遍历数据集，生成多个面板 */}
        {dataSets.map((dataSet, dataSetIndex) => (
          <ScrollView
            key={dataSetIndex}
            className='panel-scroll'
            scrollY
            enhanced
            showScrollbar={false}
            bounces={false}
            onScroll={handleScroll}
          >
            {/* 网格容器 */}
            <View 
              className='content-grid' 
              style={{ 
                gridTemplateColumns: `repeat(${column}, 1fr)`,
                display: 'grid',
                gap: '24rpx'
              }}
            >
              {/* 使用渲染函数渲染每个数据项 */}
              {dataSet.map((item, itemIndex) => 
                renderItem(item, itemIndex, dataSetIndex)
              )}
            </View>
          </ScrollView>
        ))}
      </View>
    </View>
  )
}

export default TabPanelEnhanced