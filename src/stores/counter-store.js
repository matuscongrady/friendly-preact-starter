import { State } from 'jumpstate';

export default State('CounterStore', {
  initial: {
    counter: 0
  },
  increment: state => ({
    ...state,
    counter: state.counter + 1
  }),
  decrement: state => ({
    ...state,
    counter: state.counter - 1
  })
});
