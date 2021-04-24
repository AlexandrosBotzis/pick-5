import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import NumberGrid from '@/components/NumberGrid/NumberGrid.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('NumberGrid.vue', () => {
  let store;

  const state = {
    bet: [],
  };

  beforeEach(() => {
    store = new Vuex.Store({
      state,
    });
  });

  const makeComponent = () => shallowMount(NumberGrid, {
    localVue,
    store,
  });

  it('is a Vue component', () => {
    const wrapper = makeComponent();
    expect(wrapper.vm).toBeTruthy();
  });
});
