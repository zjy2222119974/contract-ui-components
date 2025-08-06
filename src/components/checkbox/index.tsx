// React 和 Taro 核心库
import { View } from '@tarojs/components'

// 样式文件
import './index.scss'

interface CheckBoxProps {
  type?: 'circle' | 'square'
  checked: boolean
  onChange?: (checked: boolean) => void
}

export default function CheckBox({ type = 'circle', checked, onChange }: CheckBoxProps) {
  return (
    <View 
      className={`checkbox ${type} ${checked ? 'checked' : ''}`}
      onClick={() => onChange ? onChange(!checked) : undefined}
    >
      {type === 'circle' && checked && <View className="inner-circle" />}
    </View>
  )
} 