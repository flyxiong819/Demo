function longestPalindrome(s: string): string {

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
  const maxLen = longestPalindrome(item[0] as string);
  if (maxLen !== item[1]) {
    isPassed = false;
    console.error(`input: ${item[0]}, output: ${maxLen}, expected: ${item[1]}`);
  }
});

if (isPassed) {
  console.log('success!!!');
}
}
