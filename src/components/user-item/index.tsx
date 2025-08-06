import { View, Text } from '@tarojs/components';
import './index.scss';

interface UserItemProps {
  item: {
    name: string;
    update?: string;
  };
  idx: number;
}

const UserItem = ({ item, idx }: UserItemProps) => {
  return (
    <View className='user-item' key={item.name + idx}>
      <View className='item-left'>
        <View className='avatar-placeholder' />
        <View className='item-info'>
          <Text className='item-name'>{item.name}</Text>
          {item.update && (
            <View className='item-update'>
              <Text className='item-update-text'>{item.update}</Text>
              <View className='item-update-icon' />
            </View>
          )}
        </View>
      </View>
      <View className='item-right'>
        <Text className='item-followed'>已关注</Text>
      </View>
    </View>
  );
};

export default UserItem;
