// React 和 Taro 核心库
import { View } from '@tarojs/components'

// 样式文件
import './index.scss'

// 工具函数
import globalState from '../../utils/globalState'

interface BottomIndicatorProps {
  backgroundColor?: string // 可选的背景色
}

const BottomIndicator: React.FC<BottomIndicatorProps> = ({
  backgroundColor = '#FFFFFF' // 默认白色背景
}) => {
  const bottomIndicatorHeight = globalState.getBottomIndicatorHeight()

  return (
    <View 
      className='bottom-indicator' 
      style={{ 
        height: `${bottomIndicatorHeight}px`,
        backgroundColor
      }}
    />
  )
}

export default BottomIndicator 