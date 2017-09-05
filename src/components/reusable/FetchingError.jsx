import { h, Component } from 'preact';
import { Trans } from 'lingui-react';
import Error from './Error';

export default class FetchingError extends Component {
  render() {
    return (
      <Error>
        <Trans>Data fetching Error</Trans>
      </Error>
    );
  }
}
