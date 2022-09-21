function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const len1 = nums1.length;
  const len2 = nums2.length;

  // 中位数前，有多少个数
  const beforeC = Math.floor((len1 + len2 - 1) / 2);
  
  // 用于遍历数组的下标
  let p1 = 0, p2 = 0;
  // 统计前面个数
  let count = 0;
  while(count < beforeC) {
    if (p1 >= len1) {
      p2 += 1;
    }
    if (p2 >= len2) {
      p1 += 1;
    } else {
      // 比较
      if (nums1[p1] >= nums2[p2]) {
        p2 += 1;
      } else {
        p1 += 1;
      }
    }
    count += 1;
  }
  // 这时候，已经剔除了beforeC个数
  // 结果肯定在接下来的数中找
  const isOdd = (len1 + len2) % 2 === 1;
  if (isOdd) {
    if (p1 >= len1) {
      return nums2[p2];
    }
    if (p2 >= len2) {
      return nums1[p1];
    }
    return nums1[p1] > nums2[p2] ? nums2[p2] : nums1[p1];
  }
  // 偶数
  if (p1 >= len1) {
    return (nums2[p2] + nums2[p2 + 1]) / 2;
  }
  if (p2 >= len2) {
    return (nums1[p1] + nums1[p1 + 1]) / 2;
  }

  const n1 = nums1[p1] > nums2[p2] ? nums2[p2++] : nums1[p1++];

  if (p1 >= len1) {
    return (nums2[p2] + n1) / 2;
  }
  if (p2 >= len2) {
    return (nums1[p1] + n1) / 2;
  }

  const n2 = nums1[p1] > nums2[p2] ? nums2[p2] : nums1[p1];
  return (n1 + n2) / 2;
};


const input = [
  [[1, 3], [2], 2],
  [[1, 2], [3, 4], 2.5],
  [[4], [1,2,3], 2.5]
];

export function main() {
  let isPassed = true;
  input.forEach(item => {
    const result = findMedianSortedArrays(item[0] as number[], item[1] as number[]);
    if (result !== item[2]) {
      isPassed = false;
      console.error(`input: ${item[0]} & ${item[1]}, output: ${result}, expected: ${item[2]}`);
    }
  });

  if (isPassed) {
    console.log('success!!!');
  }
}