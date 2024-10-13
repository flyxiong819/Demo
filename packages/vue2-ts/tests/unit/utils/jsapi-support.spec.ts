import { verCompare } from "@/utils/jsapi-support";

describe('jsapi用到的一些方法', () => {
  describe('版本比较 verCompare', () => {
    const cases = [
      ['8.', '8', 0],
      ['8.0.10', '8', 1],
      ['7.9.0', '8', -1],
      ['8.0.0', '8.', 0],
      ['8.0.0', '8.0', 0],
      [8.1, '8.1', 0],
      ['8.1', '8.2.0', -1],
      ['8.1', '8.0.2', 1],
      [8.1, '8.02', -1],
      ['8..', '8.0', 0],
    ];
    test.each(cases)('input ver1: %s && ver2: %s. expect output %s', (ver1, ver2, expected) => {
      expect(verCompare(ver1, ver2)).toBe(expected);
    });
  });
});
