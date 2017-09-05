/* eslint-disable react/jsx-filename-extension */
import './index.css';
import 'babel-polyfill';
import { render, h } from 'preact';
import createHistory from 'history/createBrowserHistory';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import { unpackCatalog } from 'lingui-i18n';
import { ConnectedRouter } from 'react-router-redux';
import { I18nProvider } from 'lingui-react';
import { getCurrentUserLanguage } from 'services/locale-service';
import { makeStore } from './store';
import enMessageCatalog from './locale/en/messages';
import skMessageCatalog from './locale/sk/messages';
import makeRootReducer from './root-reducer';

const history = createHistory();
const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: API_ENDPOINT,
    transportBatching: true
  }),
  connectToDevTools: true
});

const store = makeStore(history, apolloClient, makeRootReducer(apolloClient));

let root;

const renderApp = () => {
  const App = require('./components/App').default;
  root = render(
    <ApolloProvider store={store} client={apolloClient}>
      <I18nProvider
        language={getCurrentUserLanguage()}
        catalogs={{
          en: unpackCatalog(enMessageCatalog),
          sk: unpackCatalog(skMessageCatalog)
        }}
        development={APP_VERSION === 'dev' && require('lingui-i18n/dev')}
      >
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </I18nProvider>
    </ApolloProvider>,
    document.getElementById('app'),
    root
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./components/App', renderApp);
  module.hot.accept('./root-reducer', () => {
    const makeNewRootReducer = require('./root-reducer').default;
    store.replaceReducer(makeNewRootReducer(apolloClient));
  });
}
