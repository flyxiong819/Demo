import {
  doModify,
  filterAccountMemo,
  formatNotifySwitch,
  getAutopayState,
  getImgGuide,
} from '../../../src/business/manage';
import { EAutopayState, ENotifyState } from '../../../src/config/constants';
describe('test getAutopayState', () => {
  it('should return false when input is undefined', () => {
    const inputAutopayState = undefined;
    const expected = {
      isAutopayNotOpen: false,
      isAutopayOpenInOther: false,
      isAutopayOpen: false,
    };
    expect(getAutopayState(inputAutopayState)).toEqual(expected);
  });

  it('should return correct state when input autopayState is close', () => {
    const inputAutopayState = EAutopayState.closed;
    const expected = {
      isAutopayNotOpen: true,
      isAutopayOpenInOther: false,
      isAutopayOpen: false,
    };
    expect(getAutopayState(inputAutopayState)).toEqual(expected);
  });

  it('should return correct state when input autopayState is openByUserButNotAcc', () => {
    const inputAutopayState = EAutopayState.closed;
    const expected = {
      isAutopayNotOpen: true,
      isAutopayOpenInOther: false,
      isAutopayOpen: false,
    };
    expect(getAutopayState(inputAutopayState)).toEqual(expected);
  });

  it('should return correct state when input autopayState is openByOtherWx', () => {
    const inputAutopayState = EAutopayState.openByOtherWx;
    const expected = {
      isAutopayNotOpen: false,
      isAutopayOpenInOther: true,
      isAutopayOpen: false,
    };
    expect(getAutopayState(inputAutopayState)).toEqual(expected);
  });

  it('should return correct state when input autopayState is open', () => {
    const inputAutopayState = EAutopayState.opened;
    const expected = {
      isAutopayNotOpen: false,
      isAutopayOpenInOther: false,
      isAutopayOpen: true,
    };
    expect(getAutopayState(inputAutopayState)).toEqual(expected);
  });
});

describe('test getImgGuide', () => {
  const channelModule = require('@/config/channel.ts');
  const mockImgNotifyGuide = 'https://st.moneydata.hk//res/weixin/hkwallet/v3/utilities/img/guide/imgNameGuide.svg';
  const mockReturnChannelItem = {
    channelId: '50000010000',
    busiId: 'busi_power',
    name: '中华电力',
    isShowSteps: false,
    accLogo: '',
    companyLogo: '',
    companyLogo2: '',
    imgNameGuide: '',
    imgNotifyGuide: mockImgNotifyGuide,
    companyNameShort: '',
    companyNameFull: '',
    isAutoPayEnable: true,
    isHideName: false,
  };
  it('should return target imgGuide when channelId is valid', () => {
    const inputChannelId = '50000010000';
    channelModule.getChannelById = jest.fn().mockReturnValue(mockReturnChannelItem);

    const expected = mockImgNotifyGuide;

    expect(getImgGuide(inputChannelId)).toEqual(expected);
  });

  it('should return empty when channelId is invalid', () => {
    const inputChannelId = '';
    channelModule.getChannelById = jest.fn().mockReturnValue(undefined);

    const expected = '';

    expect(getImgGuide(inputChannelId)).toEqual(expected);
  });
});

describe('test doModify', () => {
  const cases = [
    [
      { accountId: '500001000', isSwitchChecked: false, memoName: 'abc' },
      { accountId: '500001000', switch: ENotifyState.close, isDelete: false, memoName: 'abc' },
    ],
    [
      { accountId: '500001000', isSwitchChecked: true, isDelete: true, memoName: '     abc     ' },
      { accountId: '500001000', switch: ENotifyState.open, isDelete: true, memoName: 'abc' },
    ],
  ];
  const apiModule = require('@/api/index.ts');
  apiModule.updateAccount = jest.fn().mockResolvedValue({});
  test.each(cases)('when input %s, doModify should have been called with %s', async (input, expected) => {
    await doModify(input);
    expect(apiModule.updateAccount).toHaveBeenCalledWith(expected);
  });
});

describe('test formatNotifySwitch', () => {
  test.each([
    [undefined, false],
    [ENotifyState.open, true],
    [ENotifyState.close, false],
  ])('when input %s, then it should return %s', (input, expected) =>
    expect(formatNotifySwitch(input)).toEqual(expected),
  );
});

describe('test filterAccountMemo ', () => {
  test.each([
    ['    123', '123'],
    ['12         34', '12 34'],
    ['12ab+?&*()_cd', '12abcd'],
    ['一二三四五六七八九十十一', '一二三四五六七八九十'],
    ['1234567890一二三四五六七八', '1234567890一二三四五'],
    ['!@%*^&%123456789一二三四五六七八', '123456789一二三四五'],
  ])('when input %s, then it should return %s', (input, expected) =>
    expect(filterAccountMemo(input)).toEqual(expected),
  );
});
