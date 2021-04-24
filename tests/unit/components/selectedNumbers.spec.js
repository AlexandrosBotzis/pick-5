import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import SelectedNumbers from '@/components/SelectedNumbers/SelectedNumbers.vue';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe('SelectedNumbers.vue', () => {
  let store;

  const state = {
    bet: [],
    maxBetReached: false,
    winIndexes: [],
  };

  const $route = {
    path: '/some/random/path',
  };

  //   const router = VueRouter({ routes })

  beforeEach(() => {
    // router = new VueRouter({ routes });
    store = new Vuex.Store({
      state,
    });
  });

  const makeComponent = () => shallowMount(SelectedNumbers, {
    localVue,
    store,
    mocks: {
      $route,
    },
  });

  it('is a Vue component', () => {
    const wrapper = makeComponent();
    expect(wrapper.vm).toBeTruthy();
  });
});
