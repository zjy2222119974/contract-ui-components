import { View } from '@tarojs/components';
import { ReactNode } from 'react';
import './index.scss';

interface PopupModalProps {
  visible: boolean;
  onClose: () => void;
  type?: number;
  child?: ReactNode;
  title?: string;
  onConfirm?: () => void;
}

const PopupModal = ({ visible, onClose, type = 1, child, title, onConfirm }: PopupModalProps) => {
  if (!visible) return null;
  return (
    <View className="popup-modal-mask" onClick={onClose}>
      <View className={`popup-modal-content type-${type}`} onClick={e => e.stopPropagation()}>
        {type === 1 ? (
          <View className="popup-modal-type1">
            <View className="popup-modal-type1-header">
              <View className="popup-modal-type1-title">{title}</View>
              <View className="popup-modal-type1-close" onClick={onClose}>
                <View className="popup-modal-type1-close-icon iconfont icon-add-m" />
              </View>
            </View>
            <View className="popup-modal-type1-value-wrap">
              {child}
            </View>
            <View className="popup-modal-type1-btn" onClick={onConfirm}>
              <View className="popup-modal-type1-btn-text">确定</View>
            </View>
          </View>
        ) : (
          child
        )}
      </View>
    </View>
  );
};

export default PopupModal; 