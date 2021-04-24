import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import NumberBoard from '@/components/NumberBoard/NumberBoard.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('NumberBoard.vue', () => {
  let store;

  const state = {
    bet: [],
  };

  const actions = {
    clearHistory: jest.fn(),
  };

  beforeEach(() => {
    store = new Vuex.Store({
      state,
      actions,
    });
  });

  const makeComponent = () => shallowMount(NumberBoard, {
    localVue,
    store,
  });

  it('is a Vue component', () => {
    const wrapper = makeComponent();
    expect(wrapper.vm).toBeTruthy();
  });
});
