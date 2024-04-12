
// 节流(丢掉多余的，有序执行)，固定时间t内，只保留第1次
export function throttled(fn, delay) {
  let timer = null;
  return function(...args) {
    if (timer) return;
    timer = setTimeout(function() {
      fn.apply(this, args);
      // reset
      timer = null;
    }, delay);
  }
}

// 防抖(例子：滚动)，固定t间隔时间一次action
export function debounce() {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);  // 如果有重复调用，clear上一次的setTimeout
    // 重新setTimeout
    timer = setTimeout(function() {
      fn.apply(this, args);
    }, delay);
  }
}
