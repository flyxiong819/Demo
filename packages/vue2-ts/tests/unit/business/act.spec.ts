import { filterAct } from "@/business/act";
import { time2timestamp } from "@/utils";
const apiModule = require('@/api/index.ts');

describe('活动act business', () => {
  describe('filterAct', () => {
    window.actConf = [
      {
        isShow: '1',
        startTime: '2019/07/15 00:00:00',
        endTime: '2020/10/16 00:00:00',
        forpage: 'home',
        actImg: 'https://st.moneydata.hk/res/mojo_static/6a2334d3755734d066efa7149fc62cb0.png',
        actUrl: 'https://prom.wechatpay.com.hk/fmd_mojo/prom/app_7_114/index.shtml',
        weappUserName: '',
        weappPath: '',
        busiId: 'all',
      },
      {
        isShow: '1',
        startTime: '2019/10/20 17:19:00',
        endTime: '2021/01/19 23:59:00',
        forpage: 'bill',
        actImg: 'https://st.moneydata.hk/res/fmd_mojo_static/FWlqwL30ouBbFSSRW27odTuvCkPS2zYp.png',
        actUrl: 'https://prom.wechatpay.com.hk/fmd_mojo/prom/app_7_252/index.shtml#/',
        weappUserName: '',
        weappPath: '',
        busiId: 'busi_gas',
      },
      {
        isShow: '1',
        startTime: '2020/06/01 12:00:00',
        endTime: '2020/08/01 12:00:00',
        forpage: 'bill',
        actImg: 'https://st.moneydata.hk/res/mojo_static/ef3164f63cc34ea0822f31354819c9f3.png',
        actUrl: 'https://prom.wechatpay.com.hk/mojo/prom/app_4_611/index.shtml?ADTAG=CLP.Bill',
        weappUserName: '',
        weappPath: '',
        busiId: 'busi_power',
      },
      {
        isShow: '1',
        startTime: '2019/08/24 09:00:00',
        endTime: '2020/09/06 23:59:00',
        forpage: 'home',
        actImg: 'https://st.moneydata.hk/res/mojo_static/e6db71df9d081ad0b7b79f3f24ca93a3.png',
        actUrl: 'https://mp.weixin.qq.com/s/BqZy0y-ekUWRjH6TsKxmrw',
        weappUserName: '',
        weappPath: '',
        busiId: 'all',
      },
      {
        isShow: '1',
        startTime: '2020/12/07 16:31:00',
        endTime: '2020/12/20 16:31:00',
        forpage: 'home',
        actImg: 'https://st.moneydata.hk/res/mojo_static/6d0743f2ef5f98d1fd1faf1724ba4aee.png',
        actUrl: 'https://mp.weixin.qq.com/s/Sv5cBUzTr70A75VT36lU9A?adtag=shenghuojiaofei',
        weappUserName: '',
        weappPath: '',
        busiId: 'all',
      },
    ];
    describe('当前时间大于所有活动时间', () => {
      beforeAll(() => {
        apiModule.getSystime = jest.fn().mockReturnValue(+new Date('2022/10/12 00:00:00'));
      });
      const cases = [
        ['home', 'busi_power'],
        ['bill', 'busi_power'],
        ['home', 'busi_gas'],
        ['bill', 'busi_gas'],
      ];
      test.each(cases)('input page=%s busiId=%s, expected output []', (page, busiId) => {
        expect(filterAct(page, busiId)).toEqual([]);
      });
    });

    describe('当前时间满足一条配置', () => {
      beforeAll(() => {
        apiModule.getSystime = jest.fn().mockReturnValue(+new Date('2019/07/17 00:00:00'));
      });
      const cases = [
        ['home', 'busi_power', [{
          isShow: true,
          startTime: time2timestamp('2019/07/15 00:00:00'),
          endTime: time2timestamp('2020/10/16 00:00:00'),
          forpage: 'home',
          actImg: 'https://st.moneydata.hk/res/mojo_static/6a2334d3755734d066efa7149fc62cb0.png',
          actUrl: 'https://prom.wechatpay.com.hk/fmd_mojo/prom/app_7_114/index.shtml',
          weappUserName: '',
          weappPath: '',
          busiId: 'all',
        }]],
        ['bill', 'busi_power', []],
        ['home', 'busi_gas', [{
          isShow: true,
          startTime: time2timestamp('2019/07/15 00:00:00'),
          endTime: time2timestamp('2020/10/16 00:00:00'),
          forpage: 'home',
          actImg: 'https://st.moneydata.hk/res/mojo_static/6a2334d3755734d066efa7149fc62cb0.png',
          actUrl: 'https://prom.wechatpay.com.hk/fmd_mojo/prom/app_7_114/index.shtml',
          weappUserName: '',
          weappPath: '',
          busiId: 'all',
        }]],
        ['bill', 'busi_gas', []],
      ];
      test.each(cases)('input page=%s busiId=%s, expected output []', (page, busiId, expected) => {
        expect(filterAct(page, busiId)).toEqual(expected);
      });
    });
    describe('当前时间满足多条配置', () => {
      beforeAll(() => {
        apiModule.getSystime = jest.fn().mockReturnValue(+new Date('2020/01/01 00:00:00'));
      });
      const cases = [
        ['home', 'busi_power', [{
          isShow: true,
          startTime: time2timestamp('2019/07/15 00:00:00'),
          endTime: time2timestamp('2020/10/16 00:00:00'),
          forpage: 'home',
          actImg: 'https://st.moneydata.hk/res/mojo_static/6a2334d3755734d066efa7149fc62cb0.png',
          actUrl: 'https://prom.wechatpay.com.hk/fmd_mojo/prom/app_7_114/index.shtml',
          weappUserName: '',
          weappPath: '',
          busiId: 'all',
        }, {
          isShow: true,
          startTime: time2timestamp('2019/08/24 09:00:00'),
          endTime: time2timestamp('2020/09/06 23:59:00'),
          forpage: 'home',
          actImg: 'https://st.moneydata.hk/res/mojo_static/e6db71df9d081ad0b7b79f3f24ca93a3.png',
          actUrl: 'https://mp.weixin.qq.com/s/BqZy0y-ekUWRjH6TsKxmrw',
          weappUserName: '',
          weappPath: '',
          busiId: 'all',
        }]],
        ['bill', 'busi_power', []],
        ['home', 'busi_gas', [{
          isShow: true,
          startTime: time2timestamp('2019/07/15 00:00:00'),
          endTime: time2timestamp('2020/10/16 00:00:00'),
          forpage: 'home',
          actImg: 'https://st.moneydata.hk/res/mojo_static/6a2334d3755734d066efa7149fc62cb0.png',
          actUrl: 'https://prom.wechatpay.com.hk/fmd_mojo/prom/app_7_114/index.shtml',
          weappUserName: '',
          weappPath: '',
          busiId: 'all',
        }, {
          isShow: true,
          startTime: time2timestamp('2019/08/24 09:00:00'),
          endTime: time2timestamp('2020/09/06 23:59:00'),
          forpage: 'home',
          actImg: 'https://st.moneydata.hk/res/mojo_static/e6db71df9d081ad0b7b79f3f24ca93a3.png',
          actUrl: 'https://mp.weixin.qq.com/s/BqZy0y-ekUWRjH6TsKxmrw',
          weappUserName: '',
          weappPath: '',
          busiId: 'all',
        }]],
        ['bill', 'busi_gas', [{
          isShow: true,
          startTime: time2timestamp('2019/10/20 17:19:00'),
          endTime: time2timestamp('2021/01/19 23:59:00'),
          forpage: 'bill',
          actImg: 'https://st.moneydata.hk/res/fmd_mojo_static/FWlqwL30ouBbFSSRW27odTuvCkPS2zYp.png',
          actUrl: 'https://prom.wechatpay.com.hk/fmd_mojo/prom/app_7_252/index.shtml#/',
          weappUserName: '',
          weappPath: '',
          busiId: 'busi_gas',
        }]],
      ];
      test.each(cases)('input page=%s busiId=%s, expected output []', (page, busiId, expected) => {
        expect(filterAct(page, busiId)).toEqual(expected);
      });
    });
  });
});
