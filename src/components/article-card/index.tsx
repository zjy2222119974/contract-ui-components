// React 和 Taro 核心库
import { View, Text, Image } from '@tarojs/components'

// 样式文件
import './index.scss'

interface ArticleCardProps {
  title: string;
  authorAvatar: string;
  authorName: string;
  time: string;
  imageUrl: string;
}

const ArticleCard = ({ title, authorAvatar, authorName, time, imageUrl }: ArticleCardProps) => {
  return (
    <View className='article-card'>
      <View className='card-content'>
        <View className='text-content'>
          <Text className='title'>{title}</Text>
          <View className='author-info'>
            <View className='author'>
              <Text className='author-name'>{authorName}</Text>
              <View className='avatar-icon' />
            </View>
            <Text className='time'>{time}</Text>
          </View>
        </View>
        <View className='image-content'>
          <Image className='article-image' src={imageUrl} mode='aspectFill' />
        </View>
      </View>
    </View>
  )
}

export default ArticleCard 