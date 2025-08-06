import { View, Text } from '@tarojs/components';
import React from 'react';
import './index.scss';

interface CouponCardProps {
  coupon_id: string;
  coupon_type: string;
  coupon_name: string;
  coupon_value: number;
  min_amount: number;
  description: string;
  start_time: string;
  end_time: string;
}

const CouponCard: React.FC<CouponCardProps> = ({
  coupon_name,
  coupon_value,
  min_amount,
  description,
  start_time,
  end_time
}) => {
  // Format date to display in the component
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <View className="coupon-card">
      <View className="left">
        <View className='price'>
          <Text className='price-text'>￥</Text>
          <Text className='price-num'>{coupon_value}</Text>
        </View>
        
        <Text className="text">满{min_amount}元可用</Text>
      </View>
      <View className='divider' />
      <View className="content">
        <Text className="title">{coupon_name}</Text>
        <View className="desc-row">
          <Text className="desc">{description}</Text>
          <Text className="right-arrow">›</Text>
        </View>
        <View className="date-row">
          <Text className="date">{formatDate(start_time)}</Text>
          <Text className="date">-</Text>
          <Text className="date">{formatDate(end_time)}</Text>
        </View>
      </View>
      <View className="use-btn">
        <View className="dot" />
        <Text className="text">去使用</Text>
      </View>
    </View>
  );
};

export default CouponCard; 