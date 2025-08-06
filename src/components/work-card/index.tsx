import { View, Text, Image } from '@tarojs/components'
import './index.scss'

interface WorkCardProps {
    imageUrl: string;
    title: string;
    views: number | string;
    likes: number | string;
    type?: number;
}

const formatCount = (count: number | string) => {
    const num = typeof count === 'string' ? parseFloat(count) : count;
    if (num >= 10000) {
        return `${(num / 10000).toFixed(1)}万+`;
    }
    return num;
};

const WorkCard: React.FC<WorkCardProps> = ({ imageUrl, title, views, likes, type = 1 }) => {
    return (
        <View className={`work-card-container type${type}`}>
            <View className='work-card-image'>
                <Image src={imageUrl} className='work-card-img' mode='aspectFill' />
            </View>
            <View className='work-card-info'>
                <View className='work-card-title'>{title}</View>
                <View className='work-card-stats'>
                    <View className='work-card-stat'>
                        <View className='work-card-stat-icon iconfont icon-view-s' />
                        <View className='work-card-stat-text'>
                            <Text>{formatCount(views)}</Text>
                        </View>
                    </View>
                    <View className='work-card-stat'>
                        <View className='work-card-stat-icon iconfont icon-like-s' />
                        <View className='work-card-stat-text'>
                            <Text>{formatCount(likes)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default WorkCard; 