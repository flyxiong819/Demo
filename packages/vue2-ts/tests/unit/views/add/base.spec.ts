import { ToastType } from '@tencent/wphk-components-toast/business/business';
import { i18n } from '@/i18n';
import BaseAdd from '@/views/add/components/base';

describe('base.ts: 添加账户', () => {
  const api = require('@/api/index.ts');
  const toast = require('@tencent/wphk-components-toast/business/main');
  const helper = require('@/views/helper/index.ts');
  const mockAddData = { accountNo: '1234', name: 'a name' };
  const reqAddData = { ...mockAddData, channelId: '', buildingCode: '' };

  it('提交添加账户成功，添加账号重复', async () => {
    const mockShowToast = jest.fn();
    toast.showToast = mockShowToast;
    const mockAddAccount = jest.fn().mockResolvedValue({ isDuplicate: true });
    api.addAccount = mockAddAccount;
    const instance = new BaseAdd();

    instance.addData = { ...instance.addData, ...mockAddData };
    instance.isChecked = true;
    await instance.submit();

    expect(instance.checkParams()).toEqual(true);
    expect(mockAddAccount).toHaveBeenCalledWith(reqAddData);
    expect(mockShowToast).toHaveBeenCalledWith({
      show: true,
      type: ToastType.Tick,
      title: i18n('该账户已添加'),
      size: 130,
    });
  });

  it('提交添加账户成功，添加账号不重复', async () => {
    const mockShowToast = jest.fn();
    toast.showToast = mockShowToast;
    const mockAddAccount = jest.fn().mockResolvedValue({ isDuplicate: false });
    api.addAccount = mockAddAccount;
    const instance = new BaseAdd();

    instance.addData = { ...instance.addData, ...mockAddData };
    instance.isChecked = true;
    await instance.submit();

    expect(instance.checkParams()).toEqual(true);
    expect(mockAddAccount).toHaveBeenCalledWith(reqAddData);
    expect(mockShowToast).toHaveBeenCalledWith({
      show: true,
      type: ToastType.Tick,
      title: i18n('添加成功'),
      size: 130,
    });
  });

  it('提交添加账户失败，失败错误码在ADD_USER_ERROR中', async () => {
    const mockShowToast = jest.fn();
    toast.showToast = mockShowToast;
    const mockAddAccountError = { retcode: '978624033', retmsg: '账号与用户名不匹配' };
    const mockAddAccount = jest.fn().mockRejectedValue(mockAddAccountError);
    api.addAccount = mockAddAccount;
    const instance = new BaseAdd();

    instance.addData = { ...instance.addData, ...mockAddData };
    instance.isChecked = true;
    try {
      await instance.submit();
    } catch (e) {}

    expect(instance.checkParams()).toEqual(true);
    expect(mockAddAccount).toHaveBeenCalledWith(reqAddData);
    expect(instance.toastInfo).toEqual(mockAddAccountError.retmsg);
    expect(mockShowToast).not.toHaveBeenCalled();
  });

  it('提交添加账户失败，失败错误码不在ADD_USER_ERROR中', async () => {
    const mockShowToast = jest.fn();
    toast.showToast = mockShowToast;
    const mockHandleError = jest.fn();
    helper.handleError = mockHandleError;
    const mockAddAccountError = { retcode: '000000', retmsg: 'System busy' };
    const mockAddAccount = jest.fn().mockRejectedValue(mockAddAccountError);
    api.addAccount = mockAddAccount;
    const instance = new BaseAdd();

    instance.addData = { ...instance.addData, ...mockAddData };
    instance.isChecked = true;
    try {
      await instance.submit();
    } catch (e) {}

    expect(instance.checkParams()).toEqual(true);
    expect(mockAddAccount).toHaveBeenCalledWith(reqAddData);
    expect(instance.toastInfo).toEqual('');
    expect(mockHandleError).toHaveBeenCalledWith(mockAddAccountError);
    expect(mockShowToast).not.toHaveBeenCalled();
  });
});
