import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import HistoryTable from '@/components/HistoryTable/HistoryTable.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('HistoryTable.vue', () => {
  let store;

  const actions = {
    fetchHistoricalData: jest.fn(),
  };

  beforeEach(() => {
    store = new Vuex.Store({
      history: [],
      actions,
    });
  });

  const makeComponent = () => shallowMount(HistoryTable, {
    localVue,
    store,
  });

  it('is a Vue component', () => {
    const wrapper = makeComponent();
    expect(wrapper.vm).toBeTruthy();
  });
});
