import { EDateFormat } from "@/config/constants";
import { fen2yuan, formatLanguage, formatTime, isObject, myLen, mySubstr, throttle, time2timestamp, yuan2fen } from "@/utils";
import { language } from '@tencent/ppd-base-libs';

describe('通用方法', () => {
  describe('时间转为时间戳 time2timestamp', () => {
    describe('可正常转换情况', () => {
      const cases = [
        ['1970/01/01 00:00:00', true, +new Date('1970/01/01 00:00:00')],
        ['2021/08/11 15:14:00', true, +new Date('2021/08/11 15:14:00')],
        ['2021-08-11 15:14:00', true, +new Date('2021/08/11 15:14:00')],
        ['2021-08/11 15:14:00', true, +new Date('2021/08/11 15:14:00')],
        ['2021/08-11 15:14:00', true, +new Date('2021/08/11 15:14:00')],
        ['2021/08/11', true, +new Date('2021/08/11 00:00:00')],
      ];

      test.each(cases)('input time: %s, use default: %s. expected output: %s', (time, isUseDef, expected) => {
        expect(time2timestamp(time, isUseDef)).toBe(expected);
      });
    });
    describe('不可正常转换情况', () => {
      const cases = [
        ['2021/08-1115:14:00', true, +new Date()],
        ['', true, +new Date()],
        ['2021/08-1115:14:00', false, NaN],
        [2021, false, +new Date('2021')],
        [2021, true, +new Date('2021')],
      ];

      test.each(cases)('input time: %s, use default: %s. expected output: %s', (time, isUseDef, expected) => {
        const result = Math.floor(time2timestamp(time, isUseDef) / 1000);
        expect(result).toBe(Math.floor(expected / 1000));
      });
    });
  });

  describe('语言规则化 formatLanguage', () => {
    const cases = [
      ['zh-cn', 'zh_cn'],
      ['zh_cn', 'zh_cn'],
      ['zh-hk', 'zh_hk'],
      ['zh_hk', 'zh_hk'],
      ['zh-tw', 'zh_hk'],
      ['zh_tw', 'zh_hk'],
      ['en', 'en'],
      ['ksks', 'en'],
      ['23-sdk', 'en'],
      ['', 'en'],
    ];
    test.each(cases)('agent language: %s, output language: %s', (agendLang, expected) => {
      language.getLanguage = jest.fn().mockReturnValue(agendLang);
      expect(formatLanguage()).toBe(expected);
    });
  });

  describe('元转分 yuan2fen', () => {
    const cases = [
      [undefined, NaN],
      ['', NaN],
      ['1234.01', 123401],
      [1234.001, 123400],
      ['0.01', 1],
      [0.01, 1],
      [0.009, 1],
      [0.005, 1],
      [0.004, 0],
      [9999999.999, 1000000000],
      [9999999.99, 999999999],
      [9999999.994, 999999999],
      [99999.995, 10000000],
      ['0', 0],
      [0, 0],
      ['0.00', 0],
    ];

    test.each(cases)('input: %s, expected output: %s', (input, expcectd) => {
      expect(yuan2fen(input)).toBe(expcectd);
    });
  });

  describe('分转元 fen2yuan', () => {
    const cases = [
      [undefined, ''],
      ['', ''],
      ['123401', '1234.01'],
      [123400, '1234.00'],
      [1, '0.01'],
      [0, '0.00'],
      [1000000000, '10000000.00'],
      [999999999, '9999999.99'],
      [10000000, '100000.00'],
      ['0', '0.00'],
    ];

    test.each(cases)('input: %s, expected output: %s', (input, expcectd) => {
      expect(fen2yuan(input)).toBe(expcectd);
    });
  });

  describe('截流器 throttle', () => {
    const testFn = jest.fn().mockReturnValue({});
    const tmpFn = throttle(testFn, 1000);
    test('在1s的时间内多次调用throttle，但testFn只执行一次', () => {
      for (let i = 0; i < 10; i++) {
        tmpFn();
      }
      expect(testFn).toBeCalledTimes(1);
    });
    test('在1s的时间内多次调用throttle，testFn按照预期执行2次', async () => {
      for (let i = 0; i < 10; i++) {
        tmpFn();
      }
      await new Promise((resolved) => {
        setTimeout(() => {
          tmpFn();
          resolved('ok');
        }, 2000);
      });

      expect(testFn).toBeCalledTimes(2);
    });
  });

  describe('判断是否为object对象 isObject', () => {
    const cases = [
      [{}, true],
      ['abc', false],
      [true, false],
      [1234, false],
      [null, false],
      [NaN, false],
      [undefined, false],
    ];

    test.each(cases)('input: %s, epected output: %s', (input, expected) => {
      expect(isObject(input)).toBe(expected);
    });
  });

  describe('计算字符串长度（含中文） myLen', () => {
    const cases = [
      ['科技等我放假啊是isdsd23', 23],
      ['；‘。，、=', 11],
      ['', 0],
      ['akddfsd  k', 10],
      ['1234‘，22', 10],
      [' ', 1],
      ['，', 2],
      ['可是点击ksd‘，“、2342速度快', 29],
      ['。？！，、；：“”‘’（）《》〈〉【】『』「」﹃﹄〔〕…—～﹏￥', 64],
    ];
    test.each(cases)('input: %s, expect output: %s', (input, expected) => {
      expect(myLen(input)).toBe(expected);
    });
  });

  describe('字符串截取（含中文） mySubstr', () => {
    const cases = [
      ['科技等我放假啊是isdsd23', 13, '科技等我放假啊'],
      ['；‘。，、=', 6, '；‘。'],
      ['', 1, ''],
      ['akddfsd  k', 5, 'akddf'],
      ['1234‘，22', 5, '1234‘'],
      [' ', 0, ''],
      ['，', 1, '，'],
      ['可是点击ksd‘，“、2342速度快', 14, '可是点击ksd‘'],
      ['。？！，、；：“”‘’（）《》〈〉【】『』「」﹃﹄〔〕…—～﹏￥', 20, '。？！，、；：“”‘'],
    ];

    test.each(cases)('input str=%s AND maxLen=%s, expect output: %s', (str, maxLen, expected) => {
      expect(mySubstr(str, maxLen)).toBe(expected);
    });
  });

  describe('格式化日期 formatTime', () => {
    describe('默认格式', () => {
      const cases = [
        ['1970/01/01 00:00:00', '1970-01-01 00:00:00'],
        ['2021/08/11 15:14:00', '2021-08-11 15:14:00'],
        ['2021-08-11 15:14:00', '2021-08-11 15:14:00'],
        ['2021-08/11 15:14:00', '2021-08-11 15:14:00'],
        ['2021/08-11 15:14:00', '2021-08-11 15:14:00'],
        ['2021/08/11', '2021-08-11 00:00:00'],
      ];
      test.each(cases)('input strDate=%s, expect output: %s', (input, expected) => {
        expect(formatTime(input)).toBe(expected);
      });
    });
    describe('指定格式', () => {
      const cases = [
        ['1970/01/01 00:00:00', `${EDateFormat.yyyy}-${EDateFormat.mm}-${EDateFormat.dd} ${EDateFormat.hh}:${EDateFormat.ii}:${EDateFormat.ss}`, '1970-01-01 00:00:00'],
        ['2021/08/11 15:14:00', `${EDateFormat.yyyy}/${EDateFormat.mm}/${EDateFormat.dd} ${EDateFormat.hh}:${EDateFormat.ii}:${EDateFormat.ss}`, '2021/08/11 15:14:00'],
        ['2021-08-11 15:14:00', `${EDateFormat.yyyy}-${EDateFormat.mm}/${EDateFormat.dd}`, '2021-08/11'],
        ['2021-08/11 15:14:00', `${EDateFormat.dd}/${EDateFormat.mm}/${EDateFormat.yyyy} ${EDateFormat.hh}:${EDateFormat.ii}:${EDateFormat.ss}`, '11/08/2021 15:14:00'],
        ['2021/08-11 15:14:00', `${EDateFormat.hh}:${EDateFormat.ii}:${EDateFormat.ss}`, '15:14:00'],
        ['2021/08/11', `${EDateFormat.yyyy}-${EDateFormat.mm}-${EDateFormat.dd}`, '2021-08-11'],
        ['2021/08-11 15:14:00', `${EDateFormat.hh}:${EDateFormat.ii}`, '15:14'],
        ['2021-08-11 15:14:00', `${EDateFormat.mm}-${EDateFormat.dd}`, '08-11'],
        ['2021-08-11 15:14:00', `${EDateFormat.yyyy}-${EDateFormat.mm}`, '2021-08'],
      ];
      test.each(cases)('input strDate=%s && format=%s, expect output: %s', (input, format, expected) => {
        expect(formatTime(input, format)).toBe(expected);
      });
    });
    describe('异常情况', () => {
      const curObj = new Date();
      const curDate = `${curObj.getFullYear()}-${curObj.getMonth() < 9 ? '0' : ''}${curObj.getMonth() + 1}-${curObj.getDate() < 10 ? '0' : ''}${curObj.getDate()}`;
      const cases = [
        ['2021/08-1115:14:00', `${EDateFormat.yyyy}-${EDateFormat.mm}-${EDateFormat.dd}`, curDate],
        ['', `${EDateFormat.yyyy}-${EDateFormat.mm}-${EDateFormat.dd}`, curDate],
        ['2021/08-1115:14:00', `${EDateFormat.yyyy}-${EDateFormat.mm}-${EDateFormat.dd}`, curDate],
        [2021, `${EDateFormat.yyyy}-${EDateFormat.mm}-${EDateFormat.dd}`, '2021-01-01'],
      ];
      test.each(cases)('input strDate=%s && format=%s, expect output: %s', (input, format, expected) => {
        expect(formatTime(input, format)).toBe(expected);
      });
    });
  });
});
