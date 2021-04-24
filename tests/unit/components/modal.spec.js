import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Modal from '@/components/Modal/Modal.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Modal.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
    });
  });

  const makeComponent = () => shallowMount(Modal, {
    localVue,
    store,
  });

  it('is a Vue component', () => {
    const wrapper = makeComponent();
    expect(wrapper.vm).toBeTruthy();
  });
});
