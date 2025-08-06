import React from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

interface TabTitleProps {
  tabData: Array<{
    index: number
    title: string
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
  currentIndex?: number
  onTabChange?: (index: number) => void
  type?: 1 | 2  // 新增type属性，1为默认样式，2为简单样式
  theme?: 'white' | 'black' // 新增theme属性
}

const TabTitle: React.FC<TabTitleProps> = ({ 
  tabData, 
  currentIndex = 0, 
  onTabChange,
  type = 1,  // 设置默认值为1
  theme = 'white' // 设置默认值为white
}) => {
  return (
    <View className={`tab-title theme-${theme}`}>
      {tabData.map((tab, index) => (
        <View 
          key={index} 
          className={`tab-item ${index === currentIndex ? 'active' : ''} ${type === 2 ? 'simple' : ''}`}
          onClick={() => {
            // console.log('点击后的标签页索引:', index)
            onTabChange && onTabChange(index)
          }}
        >
          <Text className='tab-text'>{tab.title}</Text>
        </View>
      ))}
    </View>
  )
}

export default TabTitle 