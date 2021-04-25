import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Header from '@/components/Header/Header.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Header.vue', () => {
  let store;

  const state = {
    user: 'unit@test.com',
    drawState: 'running',
  };

  beforeEach(() => {
    store = new Vuex.Store({
      state,
    });
  });

  const makeComponent = () => shallowMount(Header, {
    localVue,
    store,
  });

  it('is a Vue component', () => {
    const wrapper = makeComponent();
    expect(wrapper.vm).toBeTruthy();
  });
});
