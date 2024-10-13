import { filterNotice } from "@/business/notice";
// import { formatLanguage, utils.time2timestamp } from "@/utils";
const utils = require('@/utils/index.ts');
const apiModule = require('@/api/index.ts');

describe('通知notice business', () => {
  describe('filterNotice', () => {
    window.noticeConf = [
      {
        isShow: true,
        start_time: '2019/12/03 17:00:00',
        end_time: '2020/01/22 23:59:59',
        notice_zh_hk: '通知: 電費繳費服務系統維護中，暫時未能使用，請稍後再試。',
        notice_zh_cn: '通知: 电费缴费服务系统维护中，暂时未能使用，请稍后再试。',
        notice_en:
          'Notice: System maintenance, the electricity bill payment service is temporarily suspended, please try again later.',
        isJump: false,
        jump_type: '',
        jumpType: '',
      },
      {
        isShow: true,
        start_time: '2020/01/18 15:30:00',
        end_time: '2020/02/20 23:59:59',
        notice_zh_hk: '通知: WeChat Pay HK政府繳費服務——賬單付款方式調整通知',
        notice_zh_cn: '通知: WeChat Pay HK政府缴费服务——账单支付方式调整通知',
        notice_en: 'Notice: WeChat Pay HK Government Bill Payment Service - Change of Bill Payment Method',
        isJump: true,
        jump_type: 'utilities1',
        jumpType: 'utilities1',
      },
      {
        isShow: true,
        start_time: '2020/03/23 21:30:00',
        end_time: '2020/03/23 23:30:00',
        notice_zh_hk:
          'WeChat Pay HK現正進行系統維護（2020.03.23 22:00-23:30），電費繳費服務將會暫停，不便之處，敬請原諒 。',
        notice_zh_cn:
          'WeChat Pay HK系统维护中（2020.03.23 22:00-23:30），电费缴费服务将会暂停，不便之处，敬请谅解 。',
        notice_en:
          'The WeChat Pay HK system is currently under maintenance（2020.03.23 22:00-23:30）, electricity bill payment service is temporarily suspended.We apologize for any inconvenience caused.',
        isJump: false,
        jump_type: '',
        jumpType: '',
      },
      {
        isShow: true,
        start_time: '2020/03/28 23:30:00',
        end_time: '2020/03/29 01:00:00',
        notice_zh_hk:
          '中華電力現正進行系統維護（2020.03.29 00:00-01:00），電費繳費服務將會暫停，不便之處，敬請原諒 。',
        notice_zh_cn: '中华电力系统维护中（2020.03.29 00:00-01:00），电费缴费服务将会暂停，不便之处，敬请谅解 。',
        notice_en:
          'CLP system is currently under maintenance（2020.03.29 00:00-01:00）, electricity bill payment service is temporarily suspended. We apologize for any inconvenience caused.',
        isJump: false,
        jump_type: '',
        jumpType: '',
      },
      {
        isShow: true,
        start_time: '2020/04/12 05:30:00',
        end_time: '2020/04/12 07:00:00',
        notice_zh_hk:
          '中華電力現正進行系統維護（2020.04.12 06:00-07:00），電費繳費服務將會暫停，不便之處，敬請原諒 。',
        notice_zh_cn: '中华电力系统维护中（2020.04.12 06:00-07:00），电费缴费服务将会暂停，不便之处，敬请谅解 。',
        notice_en:
          'CLP system is currently under maintenance（2020.04.12 06:00-07:00）, electricity bill payment service is temporarily suspended. We apologize for any inconvenience caused.',
        isJump: false,
        jump_type: '',
        jumpType: '',
      },
      {
        isShow: true,
        start_time: '2020/04/15 23:30:00',
        end_time: '2020/04/16 00:30:00',
        notice_zh_hk:
          '中華電力現正進行系統維護（2020.04.16 00:00-00:30），電費繳費服務將會暫停，不便之處，敬請原諒 。',
        notice_zh_cn: '中华电力系统维护中（2020.04.16 00:00-00:30），电费缴费服务将会暂停，不便之处，敬请谅解 。',
        notice_en:
          'CLP system is currently under maintenance（2020.04.16 00:00-00:30）, electricity bill payment service is temporarily suspended. We apologize for any inconvenience caused.',
        isJump: false,
        jump_type: '',
        jumpType: '',
      },
    ];
    describe('当前时间大于所有通知', () => {
      beforeAll(() => {
        apiModule.getSystime = jest.fn().mockReturnValue(+new Date('2022/10/12 00:00:00'));
      });
      test('没有符合时间的通知配置，返回{}', () => {
        expect(filterNotice()).toEqual({});
      });
    });
    describe('当前时间满足一条配置', () => {
      beforeAll(() => {
        apiModule.getSystime = jest.fn().mockReturnValue(+new Date('2020/01/01 00:00:00'));
        utils.formatLanguage = jest.fn().mockReturnValue('en');
      });
      test('预期返回1条配置，英文', () => {
        expect(filterNotice()).toEqual({
          isShow: true,
          startTime: utils.time2timestamp('2019/12/03 17:00:00'),
          endTime: utils.time2timestamp('2020/01/22 23:59:59'),
          notice: 'Notice: System maintenance, the electricity bill payment service is temporarily suspended, please try again later.',
          isJump: false,
          jumpType: '',
        });
      });
    });
    describe('当前时间满足多条配置', () => {
      beforeAll(() => {
        apiModule.getSystime = jest.fn().mockReturnValue(+new Date('2020/01/19 00:00:00'));
        utils.formatLanguage = jest.fn().mockReturnValue('zh_hk');
      });
      test('预期返回第1条配置，繁体', () => {
        expect(filterNotice()).toEqual({
          isShow: true,
          startTime: utils.time2timestamp('2019/12/03 17:00:00'),
          endTime: utils.time2timestamp('2020/01/22 23:59:59'),
          notice: '通知: 電費繳費服務系統維護中，暫時未能使用，請稍後再試。',
          isJump: false,
          jumpType: '',
        });
      });
    });
  });
});
