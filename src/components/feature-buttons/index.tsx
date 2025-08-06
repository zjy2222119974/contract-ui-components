// React 和 Taro 核心库
import { View, Text } from '@tarojs/components'
import { CSSProperties } from 'react'
import Taro from '@tarojs/taro'

// 样式文件
import './index.scss'

interface FeatureButton {
  /** 按钮标题 */
  title: string
  /** 按钮图标类名 */
  icon?: string
  /** 按钮链接地址 */
  url?: string
  /** 按钮点击事件 */
  onClick?: () => void
  /** 按钮是否禁用 */
  disabled?: boolean
  /** 按钮是否加载中 */
  loading?: boolean
  /** 按钮类型 */
  type?: 'primary' | 'secondary' | 'text'
  /** 按钮大小 */
  size?: 'small' | 'medium' | 'large'
  /** 按钮自定义样式 */
  style?: React.CSSProperties
  /** 按钮自定义类名 */
  className?: string
  /** 按钮是否显示 */
  visible?: boolean
  /** 按钮是否选中 */
  selected?: boolean
}

interface FeatureButtonsProps {
  buttons: FeatureButton[]
  style?: CSSProperties
}

const FeatureButtons: React.FC<FeatureButtonsProps> = ({ buttons, style }) => {
  const handleButtonClick = (button: FeatureButton, index: number) => {
    // If the button has an onClick handler, call it
    if (button.onClick) {
      button.onClick()
      return
    }
    
    // If the button has a URL, navigate to it
    if (button.url) {
      Taro.navigateTo({
        url: button.url
      })
    }
  }

  return (
    <View className='feature-buttons-container' style={style}>
      {buttons.map((button, index) => (
        <View 
          key={index} 
          className='feature-button' 
          onClick={() => handleButtonClick(button, index)}
        >
          <View className='icon-container'>
            <View className='icon-circle'>
              {button.icon && <View className={`iconfont ${button.icon}`}></View>}
            </View>
          </View>
          <Text className='button-title'>{button.title}</Text>
        </View>
      ))}
    </View>
  )
}

export default FeatureButtons 