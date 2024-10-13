import Gas from '@/views/add/components/gas.vue';
import { shallowMount } from '@vue/test-utils';
import { EBusinessId } from '../../../../src/config/constants';
describe('gas.vue: 表单校验', () => {

  it('输入合法的账号和名称，有勾选条款', async () => {
    const mockAddData = { accountNo: '1234', name: 'a name' };
    const mockShowTip = jest.fn();
    const mockHideTip = jest.fn();
    const wrapper = shallowMount(Gas, {
      computed: {
        refProtocol: () => ({
          showTip: mockShowTip,
          hideTip: mockHideTip
        })
      }
    });
    const component = wrapper.vm as any;

    await wrapper.setData({ addData: mockAddData, isChecked: true });

    expect(component.addType).toEqual(EBusinessId.gas);
    expect(component.isCheckParamsSuccess).toEqual(true);
    expect(component.checkParams()).toEqual(true);
    expect(mockShowTip).not.toHaveBeenCalled();
  });

  it('输入合法的账号，非法的名称', async () => {
    const mockAddData = { accountNo: '1234', name: ' ' };
    const wrapper = shallowMount(Gas);
    const component = wrapper.vm as any;

    await wrapper.setData({ addData: mockAddData, isChecked: true });

    expect(component.addType).toEqual(EBusinessId.gas);
    expect(component.isCheckParamsSuccess).toEqual(false);
    expect(component.checkParams()).toEqual(false);
  });

  it('输入非法的账号，合法的名称', async () => {
    const mockAddData = { accountNo: ' ', name: 'a name' };
    const wrapper = shallowMount(Gas);
    const component = wrapper.vm as any;

    await wrapper.setData({ addData: mockAddData, isChecked: true });

    expect(component.addType).toEqual(EBusinessId.gas);
    expect(component.isCheckParamsSuccess).toEqual(false);
    expect(component.checkParams()).toEqual(false);
  });

  it('输入非法的账号和名称', async () => {
    const mockAddData = { accountNo: '@#￥', name: '1234567890123456789012345678901234567890123456789012345678901234567890123456789012' };
    const wrapper = shallowMount(Gas);
    const component = wrapper.vm as any;

    await wrapper.setData({ addData: mockAddData, isChecked: true });

    expect(component.addType).toEqual(EBusinessId.gas);
    expect(component.isCheckParamsSuccess).toEqual(false);
    expect(component.checkParams()).toEqual(false);
  });

  it('输入合法的账号和名称，但是没有勾选条款', async () => {
    const mockAddData = { accountNo: '1234', name: 'a name' };
    const mockShowTip = jest.fn();
    const mockHideTip = jest.fn();
    const wrapper = shallowMount(Gas, {
      computed: {
        refProtocol: () => ({
          showTip: mockShowTip,
          hideTip: mockHideTip
        })
      }
    });
    const component = wrapper.vm as any;

    await wrapper.setData({ addData: mockAddData, isChecked: false });

    expect(component.addType).toEqual(EBusinessId.gas);
    expect(component.isCheckParamsSuccess).toEqual(true);
    expect(component.checkParams()).toEqual(false);
    expect(mockShowTip).toHaveBeenCalledTimes(1);
  });
});
