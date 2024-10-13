import { getAccountData, getBillData, formatAccountItem } from '@/business/account';
import { getBusinessById } from '@/business/business-config';
import { getChannelById } from '@/business/channel-config';
import { EAutopayState, EBusinessId, EChannelId, ENotifyState } from '@/config/constants';
const apiModule = require('@/api/index.ts');

describe('账户business', () => {
  describe('getAccountData', () => {
    console.log('warn: 注意给test加await，否则后面的jest.fn会影响前面的mock');
    describe('no account', async () => {
      apiModule.qryAccountList = jest.fn().mockResolvedValue([]);
      await test('when called, qryAccountList should be called with 0, 10', async () => {
        await getAccountData();
        expect(apiModule.qryAccountList).toHaveBeenCalledWith(0, 10);
      });
      await test('when called, getAccountData should return []', async () => {
        const result = await getAccountData();
        expect(result).toEqual([]);
      });
    });
    describe('has account', async () => {
      apiModule.qryAccountList = jest.fn().mockResolvedValue([{
        memoName: 'memo-zen-电费',
        maskName: 'zen**cn-电费',
        maskAccountNo: '111*****111',
        name: '陈增雄-电费',
        accountNo: '1111111111',
        notifySwitch: ENotifyState.close,
        accountId: '11111111',
        channelId: EChannelId.clp,
        autopayState: EAutopayState.closed,
        autopayCreateTime: '',
        bankType: '',
        cardNoTail: '',
        planId: '',
        buildingCode: '',
      }, {
        memoName: 'memo-zen-燃气',
        maskName: 'zen**cn-燃气',
        maskAccountNo: '222*****222',
        name: '陈增雄-燃气',
        accountNo: '22222222222',
        notifySwitch: ENotifyState.close,
        accountId: '22222222',
        channelId: EChannelId.towngas,
        autopayState: EAutopayState.closed,
        autopayCreateTime: '',
        bankType: '',
        cardNoTail: '',
        planId: '',
        buildingCode: '',
      }]);
      await test('when called, qryAccountList should be called with 0, 10', async () => {
        await getAccountData();
        expect(apiModule.qryAccountList).toHaveBeenCalledWith(0, 10);
      });
      await test('when called, get AccountData shold return 2 account', async () => {
        const result = await getAccountData();
        // 电费
        const channelInfoClp = getChannelById(EChannelId.clp);
        const busiInfoClp = getBusinessById(channelInfoClp.busiId);
        // 燃气
        const channelInfoTowngas = getChannelById(EChannelId.towngas);
        const busiInfoTowngas = getBusinessById(channelInfoTowngas.busiId);

        expect(result).toEqual([{
          memoName: 'memo-zen-电费',
          maskName: 'zen**cn-电费',
          maskAccountNo: '111*****111',
          name: '陈增雄-电费',
          accountNo: '1111111111',
          notifySwitch: ENotifyState.close,
          accountId: '11111111',
          channelId: EChannelId.clp,
          autopayState: EAutopayState.closed,
          autopayCreateTime: '',
          bankType: '',
          cardNoTail: '',
          planId: '',
          buildingCode: '',
          busiId: EBusinessId.power,
          companyName: channelInfoClp.companyNameFull,
          accountIcon: channelInfoClp.accLogo,
          accountBgImg: busiInfoClp.accLogo,
          accountBgColor: busiInfoClp.bgColor,
          amount: '', // 要由qryBill查询得到
          isLoadingAmt: true,
          stateDesc: '',
          stateFontClass: '',
        }, {
          memoName: 'memo-zen-燃气',
          maskName: 'zen**cn-燃气',
          maskAccountNo: '222*****222',
          name: '陈增雄-燃气',
          accountNo: '22222222222',
          notifySwitch: ENotifyState.close,
          accountId: '22222222',
          channelId: EChannelId.towngas,
          autopayState: EAutopayState.closed,
          autopayCreateTime: '',
          bankType: '',
          cardNoTail: '',
          planId: '',
          buildingCode: '',
          busiId: EBusinessId.gas,
          companyName: channelInfoTowngas.companyNameFull,
          accountIcon: channelInfoTowngas.accLogo,
          accountBgImg: busiInfoTowngas.accLogo,
          accountBgColor: busiInfoTowngas.bgColor,
          amount: '', // 要由qryBill查询得到
          isLoadingAmt: true,
          stateDesc: '',
          stateFontClass: '',
        }]);
      });
    });
  });

  // 这个有点没必要了
  describe('getBillData', async () => {
    const cases = [
      ['11111111', '11111111'],
      ['22222222', '22222222'],
    ];
    apiModule.qryBill = jest.fn().mockResolvedValue({});
    await test.each(cases)('when input %s, qryBill should be called with %s', async (input, expected) => {
      await getBillData(input);
      expect(apiModule.qryBill).toHaveBeenCalledWith(expected); // 没必要在这里测试qryBill
    });
  });

  describe('formatAccountItem', () => {
    // 电费
    const channelInfoClp = getChannelById(EChannelId.clp);
    const busiInfoClp = getBusinessById(channelInfoClp.busiId);
    // 燃气
    const channelInfoTowngas = getChannelById(EChannelId.towngas);
    const busiInfoTowngas = getBusinessById(channelInfoTowngas.busiId);
    const cases = [
      [{
        memoName: 'memo-zen-电费',
        maskName: 'zen**cn-电费',
        maskAccountNo: '111*****111',
        name: '陈增雄-电费',
        accountNo: '1111111111',
        notifySwitch: ENotifyState.close,
        accountId: '11111111',
        channelId: EChannelId.clp,
        autopayState: EAutopayState.closed,
        autopayCreateTime: '',
        bankType: '',
        cardNoTail: '',
        planId: '',
        buildingCode: '',
      }, {
        memoName: 'memo-zen-电费',
        maskName: 'zen**cn-电费',
        maskAccountNo: '111*****111',
        name: '陈增雄-电费',
        accountNo: '1111111111',
        notifySwitch: ENotifyState.close,
        accountId: '11111111',
        channelId: EChannelId.clp,
        autopayState: EAutopayState.closed,
        autopayCreateTime: '',
        bankType: '',
        cardNoTail: '',
        planId: '',
        buildingCode: '',
        busiId: channelInfoClp.busiId,
        companyName: channelInfoClp.companyNameFull,
        accountIcon: channelInfoClp.accLogo,
        accountBgImg: busiInfoClp.accLogo,
        accountBgColor: busiInfoClp.bgColor,
        amount: '', // 要由qryBill查询得到
        isLoadingAmt: true,
        stateDesc: '',
        stateFontClass: '',
        isShowMaskName: true,
      }], [{
        memoName: 'memo-zen-燃气',
        maskName: 'zen**cn-燃气',
        maskAccountNo: '222*****222',
        name: '陈增雄-燃气',
        accountNo: '22222222222',
        notifySwitch: ENotifyState.close,
        accountId: '22222222',
        channelId: EChannelId.towngas,
        autopayState: EAutopayState.closed,
        autopayCreateTime: '',
        bankType: '',
        cardNoTail: '',
        planId: '',
        buildingCode: '',
      }, {
        memoName: 'memo-zen-燃气',
        maskName: 'zen**cn-燃气',
        maskAccountNo: '222*****222',
        name: '陈增雄-燃气',
        accountNo: '22222222222',
        notifySwitch: ENotifyState.close,
        accountId: '22222222',
        channelId: EChannelId.towngas,
        autopayState: EAutopayState.closed,
        autopayCreateTime: '',
        bankType: '',
        cardNoTail: '',
        planId: '',
        buildingCode: '',
        busiId: channelInfoTowngas.busiId,
        companyName: channelInfoTowngas.companyNameFull,
        accountIcon: channelInfoTowngas.accLogo,
        accountBgImg: busiInfoTowngas.accLogo,
        accountBgColor: busiInfoTowngas.bgColor,
        amount: '', // 要由qryBill查询得到
        isLoadingAmt: true,
        stateDesc: '',
        stateFontClass: '',
        isShowMaskName: false,
      }],
    ];
    test.each(cases)('when input %s, formatAccountItem should return %s', (input, expected) => {
      expect(formatAccountItem(input)).toEqual(expected);
    });
  });
});
