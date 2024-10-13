import { h5Prepay, brandWCPay } from '@/business/pay';
import { EBillState } from '@/config/constants';
const CallJsApiModule = require('@/business/call-jsapi.ts');
const ApiModule = require('@/api/index.ts');

describe('下单business', () => {
  describe('h5Prepay', async () => {
    const prepayRequest = {
      appId: 'appId-mock',
      timeStamp: 'timeStamp-mock',
      nonceStr: 'nonceStr-mock',
      package: 'package-mock',
      signType: 'signType-mock',
      paySign: 'paySign-mock',
    };
    CallJsApiModule.initJsApi = jest.fn().mockResolvedValue({});
    CallJsApiModule.getH5PrepayRequest = jest.fn().mockResolvedValue({});
    ApiModule.order = jest.fn().mockResolvedValue({
      listId: 'listId88888888',
      prepayRequest,
    });

    await test('initJsApi && order should be called', async () => {
      const param = {
        accountId: '11111111',
        amount: 999,
        state: EBillState.owned,
        sign: '',
        queryTime: '',
        isConfirmUnlock: false,
        dueDate: '2020-02-26',
      };
      await h5Prepay(param);
      expect(CallJsApiModule.initJsApi).toHaveBeenCalledWith();
      expect(ApiModule.order).toHaveBeenCalledWith(param);
      expect(CallJsApiModule.getH5PrepayRequest).toHaveBeenCalledWith(prepayRequest);
    });
  });

  describe('brandWCPay', async () => {
    const prepayRequest = {
      appId: 'appId-mock',
      timeStamp: 'timeStamp-mock',
      nonceStr: 'nonceStr-mock',
      package: 'package-mock',
      signType: 'signType-mock',
      paySign: 'paySign-mock',
    };
    CallJsApiModule.initJsApi = jest.fn().mockResolvedValue({});
    CallJsApiModule.getBrandWCPayRequest = jest.fn().mockResolvedValue({});
    ApiModule.order = jest.fn().mockResolvedValue({
      listId: 'listId88888888',
      prepayRequest,
    });

    await test('initJsApi && order should be called', async () => {
      const param = {
        accountId: '11111111',
        amount: 999,
        state: EBillState.owned,
        sign: '',
        queryTime: '',
        isConfirmUnlock: false,
        dueDate: '2020-02-26',
      };
      await brandWCPay(param);
      expect(CallJsApiModule.initJsApi).toHaveBeenCalledWith();
      expect(ApiModule.order).toHaveBeenCalledWith(param);
      expect(CallJsApiModule.getBrandWCPayRequest).toHaveBeenCalledWith(prepayRequest);
    });
  });
});
