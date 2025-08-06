// React 和 Taro 核心库
import { View, Swiper, SwiperItem, Image, Text } from '@tarojs/components'
import { CSSProperties } from 'react'

// 样式文件
import './index.scss'

interface BannerItem {
  url: string
  textColor?: string
}

interface BannerProps {
  items: BannerItem[]
  style?: CSSProperties
}

const Banner: React.FC<BannerProps> = ({ items, style }) => {
  return (
    <View className='banner-container' style={style}>
      <Swiper
        className='banner-swiper'
        indicatorDots
        indicatorColor='rgba(255, 255, 255, 0.3)'
        indicatorActiveColor='#FFFFFF'
        autoplay
        interval={3000}
        circular
      >
        {items.map((item, index) => (
          <SwiperItem key={index}>
            <View className='banner-item'>
              <Image className='banner-image' src={item.url} mode='aspectFill' />
              <View className='banner-content'>
                <View className='banner-title'>
                  <Text className='title-main' style={{ color: item.textColor}}>狐仙</Text>
                  <Text className='title-sub' style={{ color: item.textColor}}>系列</Text>
                </View>
                <View className='banner-tag'>
                  <Text className='tag-text' style={{ color: item.textColor }}>契约</Text>
                  <View 
                    className='tag-badge' 
                    style={{ 
                      border: `1px solid ${item.textColor || '#FFFFFF'}`,
                      opacity: 0.8
                    }}
                  >
                    <Text className='badge-text' style={{ color: item.textColor }}>官方制作</Text>
                  </View>
                </View>
                <Text className='banner-watermark' style={{ color: item.textColor }}>CONTRACT</Text>
              </View>
            </View>
          </SwiperItem>
        ))}
      </Swiper>
    </View>
  )
}

export default Banner 