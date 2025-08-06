import { View, Text, ScrollView, Image } from '@tarojs/components'
import WorkCard from '../work-card'
import './index.scss'

interface AnchorCardProps {
    avatarUrl?: string;
    nickname: string;
    fans: number | string;
    account: string;
    onFollow?: () => void;
    onClick?: () => void;
}

const AnchorCard: React.FC<AnchorCardProps> = ({ avatarUrl, nickname, fans, account, onFollow, onClick }) => {
    const workCardList = [
        { imageUrl: '../../assets/images/example1.png', title: '作品1', views: 10, likes: 2 },
        { imageUrl: '../../assets/images/example1.png', title: '作品2', views: 8, likes: 1 },
        { imageUrl: '../../assets/images/example1.png', title: '作品3', views: 12, likes: 3 },
        { imageUrl: '../../assets/images/example1.png', title: '作品4', views: 6, likes: 2 },
        { imageUrl: '../../assets/images/example1.png', title: '作品5', views: 15, likes: 5 },
        { imageUrl: '../../assets/images/example1.png', title: '作品6', views: 7, likes: 1 },
    ];
    return (
        <View className='anchor-card-container' onClick={onClick}>
            <View className='anchor-card-info-wrapper'>
                <View className='anchor-card-left'>
                    <View className='anchor-card-avatar-wrapper'>                   
                        <Image className='anchor-card-avatar-img' src={avatarUrl || '../../assets/images/example1.png'} mode='aspectFill' />
                    </View>
                    <View className='anchor-card-info'>
                        <View className='anchor-card-nickname'>{nickname}</View>
                        <View className='anchor-card-fans'>
                            <View className='anchor-card-fans-icon'/>
                            <View className='anchor-card-fans-text'>
                                <Text>{fans}</Text>
                                <Text>万+</Text>
                                <Text>粉丝</Text>
                            </View>
                        </View>
                        <View className='anchor-card-account'>
                            <View className='anchor-card-account-icon' />
                            <Text className='anchor-card-account-text'>{account}</Text>
                        </View>
                    </View>
                </View>
                <View className='anchor-card-follow-btn' onClick={onFollow}>
                    <Text>关注</Text>
                </View>
            </View>
            <View className='anchor-card-work-scroll'>
                <View className='anchor-card-work-list'>
                    {workCardList.map((item, idx) => (
                        <WorkCard key={idx} {...item} />
                    ))}
                </View>
            </View>
        </View>
    )
}

export default AnchorCard; 