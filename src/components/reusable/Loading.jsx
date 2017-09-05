import { h, Component } from 'preact';
import { Trans } from 'lingui-react';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <Trans>Loading</Trans>
      </div>
    );
  }
}
