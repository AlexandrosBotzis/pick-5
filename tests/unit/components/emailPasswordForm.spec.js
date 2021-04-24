import { shallowMount, createLocalVue } from '@vue/test-utils';
import EmailPasswordForm from '@/components/EmailPasswordForm/EmailPasswordForm.vue';

const localVue = createLocalVue();

describe('EmailPasswordForm.vue', () => {
  const makeComponent = () => shallowMount(EmailPasswordForm, {
    localVue,
  });

  it('is a Vue component', () => {
    const wrapper = makeComponent();
    expect(wrapper.vm).toBeTruthy();
  });
});
