import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import CustomButton from '../button';

interface OrderItemProps {
  order: {
    storeName: string;
    items: {
      id: string;
      name: string;
      image: string;
      specs?: string[];
      tags?: string[];
      quantity: number;
      price: number;
    }[];
  };
  onClick?: () => void;
}

const OrderItem = ({ order, onClick }: OrderItemProps) => {
  return (
    <View className='order-store-container' onClick={onClick}>
      <View className='store-header'>
        <Text className='store-name'>{order.storeName}</Text>
      </View>
      <View className='order-item-container'>
        {order.items[0] && (() => {
          const item = order.items[0];
          const priceStr = item.price.toFixed(2);
          const [integerPart, decimalPart] = priceStr.split('.');
          return (
            <View className='order-item' key={item.id}>
              <Image className='item-image' src={item.image} mode='aspectFill' />
              <View className='item-info'>
                <View className='item-header'>
                  <Text className='item-name'>{item.name}</Text>
                </View>
                {item.specs && item.specs.length > 0 && (
                  <View className='item-specs'>
                    {item.specs.map((spec, index) => (
                      <Text key={index} className='spec'>{spec}</Text>
                    ))}
                  </View>
                )}
                {item.tags && item.tags.length > 0 && (
                  <View className='item-tags'>
                    {item.tags.map((tag, index) => (
                      <Text key={index} className='tag'>{tag}</Text>
                    ))}
                  </View>
                )}
              </View>
            </View>
          );
        })()}
      </View>
      <View className='order-item-footer'>
        {/* 左侧：3个圆形icon + 共X件商品 */}
        <View className='left'>
          <View className='icons'>
            {Array.from({ length: Math.min(order.items.length, 4) }).map((_, i) => (
              <View
                key={i}
                className='icon'
                style={{
                  left: `${i * 24}rpx`,
                  zIndex: 10 - i,
                }}
              />
            ))}
          </View>
          <View className='count'>
            <Text className='label'>共</Text>
            <Text className='num'>{order.items.length}</Text>
            <Text className='label'>件商品</Text>
          </View>
        </View>
        {/* 右侧：实付款+金额 */}
        <View className='right'>
          <Text className='pay-label'>实付款</Text>
          <View className='pay-amount'>
            <Text className='currency'>¥</Text>
            <Text className='integer'>1288</Text>
            <Text className='decimal'>.00</Text>
          </View>
        </View>
      </View>
      <View className='order-item-footer-button'>
        <View className='item-button'>
          <CustomButton text = '申请售后' type = 'default' size='small'></CustomButton>
        </View>
        <View className='item-button'>
          <CustomButton text = '确认收货' type = 'confirmButton' size='small'></CustomButton>
        </View>
      </View>
    </View>
  )
}

export default OrderItem 