export function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      // 参数足够了
      func.apply(this, args);
    } else {
      // 调用括号
      return function(...args2) {
        // 递归处理
        curried.apply(this, args.concat(args2));
      }
    }
  }
}
