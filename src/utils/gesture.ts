export type SwipeDirection = 'up' | 'down' | 'left' | 'right'

interface SwipeResult {
  direction: SwipeDirection
  distance: number
}

interface GestureState {
  startX: number
  startY: number
  currentX: number
  currentY: number
  isDragging: boolean
}

export class GestureHandler {
  private state: GestureState = {
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    isDragging: false
  }

  private getSwipeDirection(): SwipeDirection {
    const { startX, startY, currentX, currentY } = this.state
    const deltaX = currentX - startX
    const deltaY = currentY - startY
    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)
    // 判断是水平滑动还是垂直滑动
    if (absDeltaX > absDeltaY) {
      // 水平滑动
      return deltaX > 0 ? 'right' : 'left'
    } else {
      // 垂直滑动
      return deltaY > 0 ? 'down' : 'up'
    }
  }

  private getSwipeDistance(): number {
    const { startX, startY, currentX, currentY } = this.state
    const deltaX = currentX - startX
    const deltaY = currentY - startY
    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)
    // 返回主要滑动方向的距离
    return absDeltaX > absDeltaY ? absDeltaX : absDeltaY
  }

  handleTouchStart = (e: any) => {
    const touch = e.touches[0]
    this.state = {
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
      isDragging: true
    }
  }

  handleTouchMove = (e: any) => {
    if (!this.state.isDragging) return
    const touch = e.touches[0]
    this.state.currentX = touch.clientX
    this.state.currentY = touch.clientY
  }

  handleTouchEnd = (): SwipeResult | null => {
    if (!this.state.isDragging) {
      console.log('onScroll拦截了一个滑动')
      return null
    }

    const direction = this.getSwipeDirection()
    const distance = this.getSwipeDistance()

    // 重置状态
    this.state.isDragging = false

    // 如果距离小于5像素，认为是无效滑动
    if (distance < 5) return null

    return {
      direction,
      distance
    }
  }
}