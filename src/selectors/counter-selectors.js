import { createSelector } from 'reselect';

export const counterTimesTwoSelector = createSelector(
  state => state.CounterStore.counter,
  counter => counter * 2
);

export const counterTimesSixSelector = createSelector(
  counterTimesTwoSelector,
  counterTimesTwo => counterTimesTwo * 3
);
