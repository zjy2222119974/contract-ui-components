// React 和 Taro 核心库
import { View, Text } from '@tarojs/components'

// 样式文件
import './index.scss'

interface ButtonProps {
  type?: 'primary' | 'default' | 'warn' | 'confirmButton' | 'border' | 'radius'
  color?: string
  size?: 'small' | 'medium' | 'large'   //按高度区分 27px 40px 44px
  text: string
  onClick?: () => void
  width?: string // 新增：自定义宽度，如 '128rpx'
}

const CustomButton = ({ type = 'default', color, size = 'medium', text, onClick, width }: ButtonProps) => {
  return (
    <View className={`custom-button ${type} ${size}`} style={{ backgroundColor: color, width }} onClick={onClick}>
      <Text>{text}</Text>
    </View>
  )
}

export default CustomButton 