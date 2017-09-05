/* eslint-disable react/jsx-filename-extension */
import loadable from 'react-loadable';
import Loading from './components/reusable/Loading';
import FetchingError from './components/reusable/FetchingError';
import { h, Component } from 'preact';
import { graphql } from 'react-apollo';

export const withData = query => WrappedComponent =>
  graphql(query)(
    class WithData extends Component {
      render({ data }) {
        if (data.loading) {
          return <Loading />;
        }
        if (data.error) {
          // Good place to add production logging
          if (APP_VERSION === 'dev') {
            console.warn(`
              -> Error fetching query:
              ${query}
            `);
          }
          return <FetchingError />;
        }
        return <WrappedComponent data={data} />;
      }
    }
  );

export const loadableChunk = component =>
  loadable({
    loader: () => component,
    loading: () => Loading
  });
