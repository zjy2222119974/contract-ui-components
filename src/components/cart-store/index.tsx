// React 和 Taro 核心库
import { View, Text, Image } from '@tarojs/components'
import { useState, useEffect } from 'react'

// 样式文件
import './index.scss'

// 组件
import CheckBox from '../checkbox'

interface CartItem {
  id: string
  name: string
  image: string
  specs: string[]
  tags: string[]
  quantity: number
  price: number
  selected: boolean
  onSelect?: () => void
  checkBox?: boolean
}

interface CartStoreProps {
  name: string
  items: CartItem[]
  selected: boolean
  onSelect: (selected: boolean) => void
  onTotalPriceChange?: (totalPrice: number) => void
  checkBox?: boolean
}

const CartItem: React.FC<CartItem> = ({ id, name, image, specs, tags, quantity, price, selected, onSelect, checkBox = true }) => {
  return (
    <View className='cart-item'>
      <Image className='item-image' src={image} mode='aspectFit' />
      <View className='item-info'>
        <View className='item-header'>
          <Text className='item-name'>{name}</Text>
          {checkBox !== false && (
            <View className='item-checkbox'>
              <CheckBox checked={selected} onChange={onSelect} />
            </View>
          )}
        </View>
        <View className='item-specs'>
          {specs.map((spec, index) => (
            <Text key={index} className='spec'>{spec}</Text>
          ))}
        </View>
        <View className='item-tags'>
          {tags.map((tag, index) => (
            <Text key={index} className='tag'>{tag}</Text>
          ))}
        </View>
        <View className='item-footer'>
          <View className='quantity'>
            <Text className='number'>{quantity}</Text>
            <Text className='unit'>件</Text>
          </View>
          <View className='price'>
            <Text className='symbol'>¥</Text>
            <Text className='integer'>{price.toFixed(2).split('.')[0]}</Text>
            <Text className='decimal'>.{price.toFixed(2).split('.')[1]}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const CartStore: React.FC<CartStoreProps> = ({ name, items, selected, onSelect, onTotalPriceChange, checkBox = true }) => {
  const [itemSelected, setItemSelected] = useState<Record<string, boolean>>(
    items.reduce((acc, item) => ({ ...acc, [item.id]: item.selected }), {})
  )

  // 计算选中商品的总价格
  const calculateTotalPrice = (selectedItems: Record<string, boolean>) => {
    return items.reduce((total, item) => {
      return selectedItems[item.id] ? total + item.price * item.quantity : total
    }, 0)
  }

  // 处理店铺选择
  const handleStoreSelect = (newSelected: boolean) => {
    const newItemSelected = items.reduce((acc, item) => ({
      ...acc,
      [item.id]: newSelected
    }), {})
    setItemSelected(newItemSelected)
    onSelect(newSelected)
    // 更新总价格
    onTotalPriceChange ? onTotalPriceChange(calculateTotalPrice(newItemSelected)) : undefined
  }

  // 当商品选择状态改变时，只更新当前商品的状态
  const handleItemSelect = (id: string) => {
    const newSelected = { ...itemSelected, [id]: !itemSelected[id] }
    setItemSelected(newSelected)
    
    // 检查是否所有商品都被选中
    const allItemsSelected = Object.values(newSelected).every(Boolean)
    if (allItemsSelected !== selected) {
      onSelect(allItemsSelected)
    }
    
    // 更新总价格
    onTotalPriceChange ? onTotalPriceChange(calculateTotalPrice(newSelected)) : undefined
  }

  return (
    <View className='cart-store'>
      <View className='store-header'>
        <Text className='store-name'>{name}</Text>
        {checkBox !== false && (
          <View className='store-checkbox'>
            <CheckBox checked={selected} onChange={handleStoreSelect} />
          </View>
        )}
      </View>
      {items.map(item => (
        <CartItem
          key={item.id}
          {...item}
          selected={itemSelected[item.id]}
          onSelect={() => handleItemSelect(item.id)}
          checkBox={item.checkBox !== undefined ? item.checkBox : checkBox}
        />
      ))}
    </View>
  )
}

export default CartStore 