// ActionSheet 组件：底部弹出容器，受控显示/隐藏，带遮罩和动画
import React, { useRef, useEffect } from 'react';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import './index.scss';
import BottomIndicator from '../bottom-indicator';



interface ActionSheetProps {
  /**
   * 控制弹窗显示/隐藏
   */
  visible: boolean;
  /**
   * 点击遮罩或关闭时的回调
   */
  onClose: () => void;
  /**
   * 弹窗内容
   */
  children?: React.ReactNode;
  /**
   * 距底距离
   */
  bottom?: string;
}

/**
 * ActionSheet 组件
 * @param visible 是否显示
 * @param onClose 关闭回调
 * @param children 弹窗内容
 * @param bottom 距底距离
 */
const ActionSheet = React.forwardRef<HTMLDivElement, ActionSheetProps>(({ visible, onClose, children, bottom = '0px' }, ref) => {
  const sheetRef = useRef<HTMLDivElement>(null);

  // 控制弹窗展开/收起动画
  useEffect(() => {
    if (visible && sheetRef.current) {
      sheetRef.current.classList.add('actionsheet--show');
    } else if (sheetRef.current) {
      sheetRef.current.classList.remove('actionsheet--show');
    }
  }, [visible]);

  return (
    // 遮罩，点击时关闭弹窗
    <View className={classNames('actionsheet-mask', { 'actionsheet-mask--show': visible })} onClick={onClose}>
      {/* 弹窗主体，阻止冒泡 */}
      <View
        className={classNames('actionsheet', { 'actionsheet--show': visible })}
        ref={sheetRef as any}
        style={{ bottom }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </View>
    </View>
  );
});

export default ActionSheet; 