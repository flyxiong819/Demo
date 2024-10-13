import { shallowMount } from '@vue/test-utils';
import { EBusinessId } from '../../../../src/config/constants';
import Add from '../../../../src/views/add/index.vue';
import Gas from '../../../../src/views/add/components/gas.vue';
import Power from '../../../../src/views/add/components/power.vue';
describe('add.vue', () => {
  it('test setCurrentComponent when created', () => {
    const mockRoute = { path: 'http://www.example-path.com', query: { busiId: EBusinessId.gas } };
    const wrapper = shallowMount(Add, {
      mocks: {
        $route: mockRoute,
      },
    });
    const component = wrapper.vm as any;

    expect(component.currentIs).toEqual(Gas);
  });

  it('test setCurrentComponent when activated', () => {
    const mockRoute = { query: { busiId: EBusinessId.gas } };
    const wrapper = shallowMount(Add, {
      mocks: {
        $route: mockRoute,
      },
    });
    const component = wrapper.vm as any;

    // 手动触发activated函数
    component.$options.activated[0].call(component);

    expect(component.currentIs).toEqual(Gas);
  });

  it('test setCurrentComponent when $route.query is empty', () => {
    const mockRoute = { path: 'http://www.example-path.com', query: {} };
    const wrapper = shallowMount(Add, {
      mocks: {
        $route: mockRoute,
      },
    });

    const component = wrapper.vm as any;

    expect(component.currentIs).toEqual(Power);
  });
});
