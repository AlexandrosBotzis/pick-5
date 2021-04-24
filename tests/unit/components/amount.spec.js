import { shallowMount, createLocalVue } from '@vue/test-utils';
import Amount from '@/components/Header/Header.vue';

const localVue = createLocalVue();

describe('Amount.vue', () => {
  const makeComponent = () => shallowMount(Amount, {
    localVue,
  });

  it('is a Vue component', () => {
    const wrapper = makeComponent();
    expect(wrapper.vm).toBeTruthy();
  });
});
