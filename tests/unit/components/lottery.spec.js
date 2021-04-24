import { shallowMount, createLocalVue } from '@vue/test-utils';
import Lottery from '@/components/Lottery/Lottery.vue';

const localVue = createLocalVue();

describe('Lottery.vue', () => {
  const makeComponent = () => shallowMount(Lottery, {
    localVue,
  });

  it('is a Vue component', () => {
    const wrapper = makeComponent();
    expect(wrapper.vm).toBeTruthy();
  });
});
