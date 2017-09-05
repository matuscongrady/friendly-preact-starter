import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { CreateJumpstateMiddleware } from 'jumpstate';

export const makeStore = (history, apolloClient, rootReducer) => {
  const middlewares = [
    apolloClient.middleware(),
    CreateJumpstateMiddleware(),
    routerMiddleware(history)
  ];

  return createStore(
    rootReducer,
    compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
};
