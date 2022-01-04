import now from './now'
import isNumber from './isNumber'

// 防抖函数
export default function debounce(
  func: (...args: any) => any,
  wait: number,
  options?: { immediate: boolean }
) {
  const { immediate=false } = options || {}

  let timerId: null | number | NodeJS.Timeout,
    previous: number | null,
    context: ThisType<any> | null,
    result: any,
    args: any

  const later = function() {
    const passed = now() - (previous as number)
    clearTimeout(timerId as number)

    if (wait > passed) {
      timerId = setTimeout(later, wait - passed)
    } else {
      timerId = null  
      if (!immediate) result = func.apply(context, args)

      // 避免 func 函数递归调用 `debounced`。
      if (!isNumber(timerId)) args = context = null
    }
  }

  const debounced = function(..._args: any) {
    context = this
    args = _args
    previous = now() // 函数执行时的时间

    if (!isNumber(timerId)) {
      timerId = setTimeout(later, wait)
      if (immediate) result = func.apply(context, args)
    }

    return result
  }

  debounced.clear = function() {
    clearTimeout(timerId as number)
    timerId = args = context = null
  }

  return debounced
}
