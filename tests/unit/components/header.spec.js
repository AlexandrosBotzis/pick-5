import { shallowMount, createLocalVue } from '@vue/test-utils';
import Header from '@/components/Header/Header.vue';

const localVue = createLocalVue();

describe('Header.vue', () => {
  const makeComponent = () => shallowMount(Header, {
    localVue,
  });

  it('is a Vue component', () => {
    const wrapper = makeComponent();
    expect(wrapper.vm).toBeTruthy();
  });
});
