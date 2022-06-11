export function lengthOfLongestSubstring(s: string): number {
  const len = s.length;
  if (len === 0) {
    return 0;
  }
  let frontIdx = 0, nextIdx = 1;
  const keep = new Set();
  keep.add(s[frontIdx]);
  let max = 1;
  while(nextIdx < len) {
    const nextItem = s[nextIdx];
    if (!keep.has(nextItem)) {
      console.log(nextIdx, frontIdx, max);
      nextIdx += 1;
      if (nextIdx - frontIdx > max) {
        max = nextIdx - frontIdx;
      }
      keep.add(nextItem);
    } else {
      keep.delete(s[frontIdx]);
      frontIdx += 1;
      if (frontIdx >= nextIdx) nextIdx += 1;
      
      
    }
  }
  
  return max;
};