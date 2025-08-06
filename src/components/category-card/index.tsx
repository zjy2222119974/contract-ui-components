import { View, Text } from '@tarojs/components';
import React from 'react';
import './index.scss';

interface CategoryCardProps {
  category: { name: string; sub: { name: string }[] };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <View className="category-card">
      <View className="category-card-header">
        <Text className="category-card-title">{category.name}</Text>
        <View className="iconfont icon-right-l category-card-icon">{/* svg图标可用Image或SVG组件实现 */}</View>
      </View>
      <View className="category-card-sub-list">
        {category.sub.map((sub, idx) => (
          <View key={sub.name + idx} className="category-card-sub-item">
            <Text className="category-card-sub-title">{sub.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CategoryCard; 