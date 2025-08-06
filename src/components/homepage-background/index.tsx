// React 和 Taro 核心库
import { View } from '@tarojs/components'

// 样式文件
import './index.scss'

// 资源文件
import bg1 from '../../assets/images/bg1.jpg'
import bg2 from '../../assets/images/bg2.jpg'

const HomepageBackground = () => {
  return (
    <View className='background-container'>
      <View className='background-image' style={{ backgroundImage: `url(${bg1})` }} />
      <View className='mask-top' />
      <View className='mask-bottom' />
    </View>
  )
}

export default HomepageBackground 