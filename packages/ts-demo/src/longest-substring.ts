function lengthOfLongestSubstring(s: string): number {
  const len = s.length;
  if (len === 0) {
    return 0;
  }
  // 前一个指针，当前要处理的指针
  let frontIdx = 0, curIdx = 0;
  // 最长子字符
  let max = 0;
  // frontIdx到curIdx的字符集合
  const charSet = new Set();

  while(curIdx < len && frontIdx < len) {
    const curChar = s[curIdx];
    // console.log('curChar', curChar, charSet);
    if (!charSet.has(curChar)) {
      // 如果当前子字符串是最长的，那么更新max
      if (curIdx - frontIdx + 1 > max) {
        max += 1;
      }
      // 将当前char插入集合
      charSet.add(curChar);
      // 处理下一个curIdx
      curIdx += 1;

      // console.log('not', frontIdx, curIdx);
    } else {
      // 如果当前字符已经在前面的字符串里了，那么将frontIdx对应的char从集合中移除，并且将前指针往前移
      charSet.delete(s[frontIdx]);
      frontIdx += 1;
      // 

      // console.log('has', frontIdx, curIdx);
    }
  }
  
  return max;
};


const input = [
  ["abcabcbb", 3],
  ["bbbbb", 1],
  ["pwwkew", 3],
  ["", 0],
  ["abcdefgh", 8],
  ["abcabc", 3],
  ["abcabcd", 4],
  ["abccabcd", 4],
];

export function main() {
  let isPassed = true;
  input.forEach(item => {
    const maxLen = lengthOfLongestSubstring(item[0] as string);
    if (maxLen !== item[1]) {
      isPassed = false;
      console.error(`input: ${item[0]}, output: ${maxLen}, expected: ${item[1]}`);
    }
  });

  if (isPassed) {
    console.log('success!!!');
  }
}
