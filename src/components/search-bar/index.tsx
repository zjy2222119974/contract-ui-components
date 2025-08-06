// React 和 Taro 核心库
import { View, Input, Text } from '@tarojs/components'
import { useState } from 'react'
import { navigateTo } from '@tarojs/taro'

// 样式文件
import './index.scss'

interface SearchBarProps {
  targetURL: string
  theme: 'white' | 'black' | 'transparent'
  onSearch: (keyword: string) => Promise<void>
  button?: boolean
  text?: string
}

const SearchBar = ({ 
  targetURL, 
  theme, 
  onSearch,
  button = true,
  text = '随便搜点什么',
}: SearchBarProps) => {
  const [searchText, setSearchText] = useState('')

  const handleSearch = async () => {
    if (searchText.trim()) {
      await onSearch(searchText.trim())
      navigateTo({
        url: targetURL
      })
    }
  }

  const handleClick = () => {
    if (!button) {
      navigateTo({
        url: targetURL
      })
    }
  }

  return (
    <View 
      className={`search-bar ${theme}`}
      onClick={!button ? handleClick : undefined}
    >
      <View className='search-input-container'>
        <View className='iconfont icon-search-m search-icon'></View>
        {button ? (
          <Input
            className='search-input'
            type='text'
            placeholder='搜索'
            value={searchText}
            onInput={(e) => setSearchText(e.detail.value)}
            placeholderClass='placeholder'
          />
        ) : (
          <Text className='placeholder-text'>{text}</Text>
        )}
        {button && (
          <View className='search-button' onClick={handleSearch}>搜索</View>
        )}
      </View>
    </View>
  )
}

export default SearchBar 