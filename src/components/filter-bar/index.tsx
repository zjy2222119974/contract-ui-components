// React 和 Taro 核心库
import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'

// 样式文件
import './index.scss'

interface FilterBarProps {
  filterConditions: string[] // 过滤条件数组
  theme?: 'white' | 'black' | 'transparent' // 主题
  onFilterChange?: (condition: string) => void // 过滤条件改变的回调
}

const FilterBar: React.FC<FilterBarProps> = ({
  filterConditions,
  theme = 'white',
  onFilterChange
}) => {
  // 默认选中第一个选项（索引0）
  const [activeIndex, setActiveIndex] = useState<number>(0)

  // 初始化时触发回调，传递第一个选项
  React.useEffect(() => {
    onFilterChange && onFilterChange(filterConditions[0])
  }, [])

  const handleFilterClick = (index: number) => {
    // 如果点击的不是当前选中的选项，则切换到新选项
    if (index !== activeIndex) {
      setActiveIndex(index)
      onFilterChange && onFilterChange(filterConditions[index])
    }
  }

  return (
    <View className={`filter-bar theme-${theme}`}>
      {filterConditions.map((condition, index) => (
        <View
          key={index}
          className={`filter-item ${index === activeIndex ? 'active' : ''}`}
          onClick={() => handleFilterClick(index)}
        >
          <Text className='filter-text'>{condition}</Text>
        </View>
      ))}
    </View>
  )
}

export default FilterBar 