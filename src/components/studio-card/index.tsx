// React 和 Taro 核心库
import { View, Text, Image } from '@tarojs/components'
import { navigateTo } from '@tarojs/taro'
import { ITouchEvent } from '@tarojs/components/types/common'

// 样式文件
import './index.scss'

interface StudioCardProps {
  studioName: string          // 工作室名称
  fansCount: number         // 粉丝数
  isFollowed: boolean       // 是否已关注
  typeLabel: string         // 类型标签（如"原创"）
  likeCount: number         // 点赞数
  salesCount: number        // 销量
  studioId?: string        // 工作室ID，用于跳转
}

const StudioCard: React.FC<StudioCardProps> = ({
  studioName,
  fansCount,
  isFollowed,
  typeLabel,
  likeCount,
  salesCount,
  studioId = '1' // 默认ID，实际应该由父组件传入
}) => {
  // 格式化数字（将数字转换为"x万+"格式）
  const formatNumber = (num: number): string => {
    if (num >= 10000) {
      return `${Math.floor(num / 10000)}万+`
    }
    return String(num)
  }

  // 处理卡片点击事件
  const handleCardClick = () => {
    navigateTo({
      url: `/pages/studio/detail?id=${studioId}`
    })
  }

  // 处理关注按钮点击事件
  const handleFollowClick = (e: ITouchEvent) => {
    e.stopPropagation() // 阻止事件冒泡，避免触发卡片的点击事件
    // TODO: 处理关注/取消关注逻辑
    console.log('Follow button clicked')
  }

  return (
    <View className='studio-card' onClick={handleCardClick}>
      {/* 工作室图片区域 */}
      <View className='image-section'>
        <Image
          className='studio-image'
          mode='aspectFill'
          src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F7db6beed-d924-4750-af28-a858e0af8039%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1748398916&t=57be9e8976d41ab6d60569bea637fca0'
        />
        
        {/* 右上角信息 */}
        <View className='top-info'>
          <View className='fans-info'>
            <Image className='avatar' src='../../assets/images/banner1.jpg' mode='aspectFill' />
            <View className='fans-count'>
              <View className='icon-fans iconfont icon-like-s' />
              <Text className='count-text'>{formatNumber(fansCount)}</Text>
            </View>
          </View>
          <View 
            className='follow-button'
            onClick={handleFollowClick}
          >
            <View className='icon-follow'>
              +
            </View>
          </View>
        </View>
      </View>

      {/* 工作室信息区域 */}
      <View className='info-section'>
        {/* 第一行：工作室名称和标签 */}
        <View className='title-row'>
          <Text className='studio-name'>{studioName}</Text>
          <View className='type-label'>
            <Text>{typeLabel}</Text>
          </View>
        </View>

        {/* 第二行：点赞和销量信息 */}
        <View className='stats-row'>
          <View className='stat-item'>
            <View className='iconfont icon-like-s' />
            <Text className='stat-text'>{formatNumber(likeCount)}</Text>
          </View>
          <View className='stat-item'>
            <View className='iconfont icon-sales-s' />
            <Text className='stat-text'>{formatNumber(salesCount)}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default StudioCard 