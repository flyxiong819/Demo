import {
  filterChannelId,
  initAdd,
  handlePower,
} from '../../../src/business/add';
import { EBusinessId } from '../../../src/config/constants';
import { handleGas } from '@/business/add';
jest.mock('@/config/channel.ts', () => ({
  getChannelList: jest.fn().mockReturnValue([
    {
      channelId: '50000010000',
      busiId: 'busi_power',
      name: '中华电力-电费',
      isShowSteps: true,
      accLogo:
        'https://st.moneydata.hk//res/weixin/hkwallet/v3/utilities/img/logo/channel_acc_clp.png',
      companyLogo:
        'https://st.moneydata.hk/res/uploadcdn-static/hkwallet/utilities/20210726144951/clp-bill.png',
      companyLogo2:
        'https://st.moneydata.hk//res/weixin/hkwallet/v3/utilities/img/logo/companyLogo1_clp.svg',
      imgNameGuide:
        'https://st.moneydata.hk//res/weixin/hkwallet/v3/utilities/img/guide/imgNameGuide.svg',
      imgNotifyGuide:
        'https://st.moneydata.hk//res/weixin/hkwallet/v3/utilities/img/guide/imgNotifyGuide_clp_zh_cn.svg',
      companyNameShort: '中电',
      companyNameFull: '中华电力',
      isAutoPayEnable: false,
      isHideName: false,
    },
  ]),
}));

// 需要在这里先mock一次ppd-base-libs, 否则会报错Cannot set property elk of [object Object] which has only a getter
jest.mock('@tencent/ppd-base-libs', () => {
  return {
    elk: jest.fn(),
  };
});

describe('test add.ts', () => {
  const expectedChannel = {
    companyName: '中华电力',
    companyLogo:
      'https://st.moneydata.hk//res/weixin/hkwallet/v3/utilities/img/logo/companyLogo1_clp.svg', // 公司logo
    accountNo: '',
    name: '',
    buildingCode: '',
    channelLst: [
      {
        channelId: '50000010000',
        busiId: 'busi_power',
        name: '中华电力-电费',
        isShowSteps: true,
        accLogo:
          'https://st.moneydata.hk//res/weixin/hkwallet/v3/utilities/img/logo/channel_acc_clp.png',
        companyLogo:
          'https://st.moneydata.hk/res/uploadcdn-static/hkwallet/utilities/20210726144951/clp-bill.png',
        companyLogo2:
          'https://st.moneydata.hk//res/weixin/hkwallet/v3/utilities/img/logo/companyLogo1_clp.svg',
        imgNameGuide:
          'https://st.moneydata.hk//res/weixin/hkwallet/v3/utilities/img/guide/imgNameGuide.svg',
        imgNotifyGuide:
          'https://st.moneydata.hk//res/weixin/hkwallet/v3/utilities/img/guide/imgNotifyGuide_clp_zh_cn.svg',
        companyNameShort: '中电',
        companyNameFull: '中华电力',
        isAutoPayEnable: false,
        isHideName: false,
      },
    ],
    channelId: '50000010000',
    imgGuide:
      'https://st.moneydata.hk//res/weixin/hkwallet/v3/utilities/img/guide/imgNameGuide.svg',
  };
  it('should return initData when initAdd is called with valid busiId', () => {
    const expected = expectedChannel;

    expect(initAdd(EBusinessId.power)).toEqual(expected);
  });

  it('should return empty when initAdd is called with invalid busiId', () => {
    const input = undefined as any;
    const expected = {
      companyName: '',
      companyLogo: '',
      accountNo: '',
      name: '',
      buildingCode: '',
      channelLst: [],
      channelId: '',
      imgGuide: '',
    };

    expect(initAdd(input)).toEqual(expected);
  });

  it('should return targetChannel when filterChannelId is called with valid busId', () => {
    const input = EBusinessId.power;

    expect(filterChannelId(input)).toEqual(expectedChannel.channelLst);
  });

  it('should return empty and called elk when filterChannelId is called with invalid busId', () => {
    const input = 'anotherBusiId' as any;
    const lib = require('@tencent/ppd-base-libs');
    const mockElk = jest.fn();
    lib.elk = mockElk;

    expect(filterChannelId(input)).toEqual([]);
    expect(mockElk).toHaveBeenCalledWith({
      key: 'utilities',
      str2: 'utilities_busichannel_conf_error',
      str3: `no channelId for busiId=${input}`,
    });
  });

  describe('test handleGas', () => {
    it.each([
      ['sa#@%^^1234中文$@', '1234'],
      ['123456789090', '1234567890'],
      [undefined, ''],
    ])(
      'when input is %s, then filterAccNo should return %s',
      (input, expected) =>
        expect(handleGas.filterAccNo(input)).toEqual(expected)
    );

    it.each([
      ['sa#@%^^1234中文$@', false],
      ['123456789090', false],
      ['abcdks中鞥文', false],
      ['a   bcdks   ', true],
      [undefined, false],
      ['     ', false],
    ])(
      'when input is %s, then checkParamsName should return %s',
      (input, expected) =>
        expect(handleGas.checkParamsName(input)).toEqual(expected)
    );

    it.each([
      ['123456789090', false],
      ['9090', true],
      ['abcdks中鞥文', false],
      ['a   bcdks   ', false],
      [undefined, false],
      ['', false],
    ])(
      'when input is %s, then checkParamsAccNo should return %s',
      (input, expected) =>
        expect(handleGas.checkParamsAccNo(input)).toEqual(expected)
    );

    it.each([
      ['9090', ''],
      [
        'asdfghjklpasdfghjklpasdfghjklpasdfghjklpasdfghjklpasdfghjklpasdfghjklpasdfghjklpqwe',
        'asdfghjklpasdfghjklpasdfghjklpasdfghjklpasdfghjklpasdfghjklpasdfghjklpasdfghjklp',
      ],
      ['abcdks中鞥文', 'abcdks'],
      ['a.?+-,-&:;*bcdks', 'a.-,-&:bcdks'],
      [undefined, ''],
    ])(
      'when input is %s, then filterName should return %s',
      (input, expected) => expect(handleGas.filterName(input)).toEqual(expected)
    );
  });

  describe('test handlePower', () => {
    it.each([
      ['9090', '9090'],
      ['1234567890129012', '123456789012'],
      ['abcdks123', '123'],
      ['a.?+-,-&:;*bcdks', ''],
      [undefined, ''],
    ])(
      'when input is %s, then filterAccNo should return %s',
      (input, expected) =>
        expect(handlePower.filterAccNo(input)).toEqual(expected)
    );

    it.each([
      ['9090', true],
      ['.1234567890129012', true],
      ['1234567890123456789012345678901234567890123456789012345678901234567890123456789012', false],
      ['abcdks123中文', true],
      ['a.?+-,-&:;*bcdks', true],
      ['abcd', true],
      ['', false],
      [undefined, false],
    ])(
      'when input is %s, then checkParamsName should return %s',
      (input, expected) =>
        expect(handlePower.checkParamsName(input)).toEqual(expected)
    );

    it.each([
      ['9090', true],
      ['90', false],
      ['.1234567890129012', false],
      ['abcdks123中文', false],
      ['a.?+-,-&:;*bcdks', false],
      ['', false],
      [undefined, false],
    ])(
      'when input is %s, then checkParamsAccNo should return %s',
      (input, expected) =>
        expect(handlePower.checkParamsAccNo(input)).toEqual(expected)
    );

    it.each([
      ['   9090', '9090'],
      ['90\n', '90'],
      ['1234   2', '1234 2'],
      ['12345678901234567890123456789012345678901234567890123456789012345678901234567   89012', '12345678901234567890123456789012345678901234567890123456789012345678901234567 89'],
      [undefined, ''],
    ])(
      'when input is %s, then filterName should return %s',
      (input, expected) =>
        expect(handlePower.filterName(input)).toEqual(expected)
    );



  });
});
