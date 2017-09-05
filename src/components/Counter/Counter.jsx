import { h, Component } from 'preact';
import { Trans } from 'lingui-react';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import { counterTimesTwoSelector, counterTimesSixSelector } from 'selectors/counter-selectors';

@connect(state => ({
  counter: state.CounterStore.counter,
  counterTimesTwo: counterTimesTwoSelector(state),
  counterTimesSix: counterTimesSixSelector(state)
}))
export default class Counter extends Component {
  render({ counter, counterTimesTwo, counterTimesSix }) {
    return (
      <div>
        <p>
          <Trans>Counter</Trans>: {counter}
        </p>
        <p>
          <Trans>Counter times two</Trans>: {counterTimesTwo}
        </p>
        <p>
          <Trans>Counter times six</Trans>: {counterTimesSix}
        </p>
        <p>
          <button onClick={Actions.CounterStore.increment}>+</button>
          <button onClick={Actions.CounterStore.decrement}>-</button>
        </p>
      </div>
    );
  }
}
