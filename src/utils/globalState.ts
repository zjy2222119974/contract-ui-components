import Taro from '@tarojs/taro'

declare const wx: any;

class GlobalState {
  private static instance: GlobalState;
  private currentTabIndex: number = 2; //navibar索引
  private menuButtonHeight: number = 0; //胶囊高度
  private menuButtonTop: number = 0; //胶囊距页面顶部距离
  private menuButtonWidth: number = 0; //胶囊宽度
  private systemInfo: any = null; //获取用户系统信息
  private menuButtonInfo: any = null; //获取胶囊信息
  private statusBarHeight: number = 44; //状态栏高度
  private windowHeight: number = 0; //窗口高度
  private windowWidth: number = 0; //窗口宽度
  private  navigationBarHeight: number = 44; //默认导航栏高度44
  private static readonly rpxRatio: number = 750; // 设计稿宽度，用于rpx转px
  private static readonly iosBottomIndicatorHeight: number = 24; // iOS底部指示条高度
  

  private constructor() {
    this.systemInfo = wx.getSystemInfoSync()
    this.menuButtonInfo = wx.getMenuButtonBoundingClientRect()
    this.menuButtonHeight = this.menuButtonInfo ? (this.menuButtonInfo.height ? this.menuButtonInfo.height : 0) : 0
    this.menuButtonTop = this.menuButtonInfo ? (this.menuButtonInfo.top ? this.menuButtonInfo.top : 0) : 0
    this.menuButtonWidth = this.menuButtonInfo ? (this.menuButtonInfo.width ? this.menuButtonInfo.width : 0) : 0
    this.statusBarHeight = this.systemInfo ? (this.systemInfo.statusBarHeight ? this.systemInfo.statusBarHeight : 0) : 0
    this.windowHeight = this.systemInfo ? (this.systemInfo.windowHeight ? this.systemInfo.windowHeight : 0) : 0
    this.windowWidth = this.systemInfo ? (this.systemInfo.windowWidth ? this.systemInfo.windowWidth : 0) : 0
    this.navigationBarHeight = this.systemInfo ? (this.systemInfo.navigationBarHeight ? this.systemInfo.navigationBarHeight : 0) : 0
    console.log('系统信息:', this.systemInfo);
  }

  public static getInstance(): GlobalState {
    if (!GlobalState.instance) {
      GlobalState.instance = new GlobalState();
    }
    return GlobalState.instance;
  }

  public setCurrentTabIndex(index: number): void {
    this.currentTabIndex = index;
    console.log('当前选中tab索引:', index);
  }

  public getCurrentTabIndex(): number {
    return this.currentTabIndex;
  }

  public getStatusBarHeight(): number {
    return this.statusBarHeight;
  }

  public getWindowHeight(): number {
    return this.windowHeight;
  }

  public getWindowWidth(): number {
    return this.windowWidth;
  }

  /**
   * 获取导航栏高度
   * 1. 优先使用系统提供的navigationBarHeight
   * 2. 如果系统值为0或不存在，使用手动计算：(胶囊顶部距离-状态栏高度)*2 + 胶囊高度
   * 3. 如果无法计算，返回默认值44
   */
  public getNavigationBarHeight(): number {
    // 尝试获取系统提供的导航栏高度
    const systemNavHeight = this.systemInfo ? this.systemInfo.navigationBarHeight : 0;
    if (systemNavHeight && systemNavHeight > 0) {
      return systemNavHeight;
    }

    // 如果系统值无效，使用手动计算
    try {
      const menuButtonTop = this.getMenuButtonTop();
      const statusBarHeight = this.getStatusBarHeight();
      const menuButtonHeight = this.getMenuButtonHeight();
      
      // 确保所需的值都存在且有效
      if (menuButtonTop && statusBarHeight && menuButtonHeight) {
        // 导航栏高度 = (胶囊顶部距离-状态栏高度)*2 + 胶囊高度
        const calculatedHeight = (menuButtonTop - statusBarHeight) * 2 + menuButtonHeight;
        // 确保计算结果合理（大于等于胶囊高度，小于100）
        if (calculatedHeight >= menuButtonHeight && calculatedHeight < 100) {
          return calculatedHeight;
        }
      }
    } catch (error) {
      console.error('Failed to calculate navigation bar height:', error);
    }

    // 如果计算失败或结果不合理，返回默认值44
    return this.navigationBarHeight;
  }

  public getMenuButtonHeight(): number {
    return this.menuButtonHeight;
  }

  public getMenuButtonTop(): number {
    return this.menuButtonTop;
  }

  public getMenuButtonWidth(): number {
    return this.menuButtonWidth;
  }

  public getMarginTopHeight(): number {
    return this.getStatusBarHeight() + this.getNavigationBarHeight(); 
  }

  public rpxToPx(rpx: number): number {
    return Math.floor((rpx / GlobalState.rpxRatio) * this.windowWidth);
  }

  

  public getBottomIndicatorHeight(): number {
    const platform = this.systemInfo ? (this.systemInfo.platform ? this.systemInfo.platform.toLowerCase() : '') : '';
    const model = this.systemInfo ? (this.systemInfo.model ? this.systemInfo.model.toLowerCase() : '') : '';
    const isIOS = platform === 'ios' || model.includes('iphone');
    const height = isIOS ? GlobalState.iosBottomIndicatorHeight : 0;
    return height;
  }

  /**
   * 设置白色胶囊按钮（用于深色背景）
   */
  public setWhiteCapsule(): void {
    Taro.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000'
    });
  }

  /**
   * 设置黑色胶囊按钮（用于浅色背景）
   */
  public setBlackCapsule(): void {
    Taro.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff'
    });
  }
}

const globalState = GlobalState.getInstance();

// 创建一个React Hook用于访问全局状态
export const useGlobalState = () => {
  return {
    currentTabIndex: globalState.getCurrentTabIndex(),
    statusBarHeight: globalState.getStatusBarHeight(),
    windowHeight: globalState.getWindowHeight(),
    windowWidth: globalState.getWindowWidth(),
    navigationBarHeight: globalState.getNavigationBarHeight(),
    menuButtonHeight: globalState.getMenuButtonHeight(),
    menuButtonTop: globalState.getMenuButtonTop(),
    menuButtonWidth: globalState.getMenuButtonWidth(),
    marginTopHeight: globalState.getMarginTopHeight(),
    bottomIndicatorHeight: globalState.getBottomIndicatorHeight()
  };
};

export default globalState;