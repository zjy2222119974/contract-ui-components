// React 和 Taro 核心库
import React from 'react'
import { View, Text, Image } from '@tarojs/components'

// 样式文件
import './index.scss'

export interface ProductCardProps {
  /** 产品id */
  id?: string
  /** 卡片类型，用于选择不同的布局样式 */
  type?: number
  /** 商品标题 */
  title: string
  /** 商品价格 */
  price: number
  /** 商品图片URL */
  imageUrl: string
  /** 所属工作室 */
  studio?: string
  /** 浏览量 */
  views?: number
  /** 点赞数 */
  likes?: number
  /** 是否预付 */
  isPrepaid?: boolean
  /** 点击事件 */
  onClick?: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  type = 1,
  title,
  price,
  imageUrl,
  studio = 'Monster工作室',
  views = 0,
  likes = 0,
  isPrepaid = false,
  onClick
}) => {
  // 将价格拆分为整数位和小数位
  const priceStr = price.toFixed(2)
  const [integerPart, decimalPart] = priceStr.split('.')

  // 自动格式化大于一万的数字
  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return `${(num / 10000).toFixed(1)}万+`
    }
    return num.toString()
  }

  const renderType1 = () => {
    return (
      <View className='product-card type1' onClick={onClick}>
        <View className='image-container'>
          <View className='overlay-container'>
            {/* <View className='studio-container'>
              <View className='studio-icon'></View>
              <View className='studio-name-container'>
                <Text className='studio-name'>{studio}</Text>
              </View>
            </View>
            <View className='cart-container'>
              <View className='iconfont icon-cart'></View>
            </View> */}
          </View>
          <Image className='product-image' src={imageUrl} mode='heightFix' />
        </View>
        <View className='info-container'>
          <Text className='product-title'>{title}</Text>
          <View className='price-container'>
            <Text className='currency'>¥</Text>
            <Text className='price'>{integerPart}</Text>
            <Text className='decimal'>.{decimalPart}</Text>
          </View>
        </View>
      </View>
    )
  }

  const renderType2 = () => {
    return (
      <View className='product-card type2' onClick={onClick}>
        <View className='product-card-image-container'>
          {/* 右上角灰色svg占位 */}
          <View className='product-card-svg-placeholder' />
          {/* 图片灰色占位 */}
          <Image className='product-image' src={imageUrl} mode='heightFix' />
          {/* Add cart button for type2 */}
          <View className='cart-container'>
            <View className='iconfont icon-addcart-m'></View>
          </View>
        </View>
        <View className='product-card-info-container'>
          <View className='product-card-title-row'>
            <View className='product-card-title'>{title}{'阿顺丰阿帆付款后萨芬哈卡发啦哦啊哈色阿帆萨芬色粉阿方索粉色'}</View>
          </View>
          <View className='product-card-bottom-row'>
            <View className='product-card-paid-row'>
              <Text className='product-card-paid-number'>2</Text>
              <Text className='product-card-paid-unit'>万+</Text>
              <Text className='product-card-paid-label'>人已付款</Text>
            </View>
            <View className='product-card-price-row'>
              <Text className='product-card-currency'>¥</Text>
              <Text className='product-card-price'>{integerPart}</Text>
              <Text className='product-card-decimal'>.{decimalPart}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  const renderType3 = () => {
    return (
      <View className='product-card type3' onClick={onClick}>
        <View className='image-container'>
          <Image className='product-image' src={imageUrl} mode='aspectFill' />
          {/* Add cart button for type3 */}
          <View className='cart-container'>
            <View className='iconfont icon-addcart-m'></View>
          </View>
        </View>
        <View className='info-container'>
          <Text className='product-title'>{title}</Text>
          <View className='price-container'>
            <Text className='currency'>¥</Text>
            <Text className='price'>{integerPart}</Text>
            <Text className='decimal'>.{decimalPart}</Text>
          </View>
          <View className='stats-container'>
            <View className='stat-item'>
              <View className='iconfont icon-favor-s' />
              <View className='stat-value'>
                <Text className='number'>{formatNumber(views)}</Text>
              </View>
            </View>
            <View className='stat-item'>
              <View className='iconfont icon-like-s' />
              <View className='stat-value'>
                <Text className='number'>{formatNumber(likes)}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }

  const renderType5 = () => {
    return (
      <View className='product-card type5' onClick={onClick}>
        <View className='image-container' >
          <Image 
            src={imageUrl} 
            mode='aspectFill'
            className='product-image'
          />
        </View>
        <View className='content-container'>
          <View className='title-container'>
            <Text className='title'>{title}</Text>
          </View>
          <View className='price-row'>
            <View className='price-container'>
              <Text className='price'>{integerPart}</Text>
              <Text className='unit'>元</Text>
              <Text className='divider'>/</Text>
              <Text className='base-amount'>1</Text>
              <Text className='base-unit'>{decimalPart}</Text>
            </View>
            <View className='prepaid-tag'>预付</View>
          </View>
          <View className='stats-container'>
            <View className='stat-item'>
              <View className='iconfont icon-favor-s' />
              <View className='stat-value'>
                <Text className='number'>{Math.floor(views / 10000)}</Text>
                <Text className='unit'>万+</Text>
              </View>
            </View>
            <View className='stat-item'>
              <View className='iconfont icon-like-s' />
              <View className='stat-value'>
                <Text className='number'>{Math.floor(likes / 10000)}</Text>
                <Text className='unit'>万+</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }

  const renderCard = () => {
    switch (type) {
      case 1:
        return renderType1()
      case 2:
        return renderType2()
      case 3:
        return renderType3()
      case 5:
        return renderType5()
      default:
        return renderType1()
    }
  }

  return renderCard()
}

export default ProductCard 