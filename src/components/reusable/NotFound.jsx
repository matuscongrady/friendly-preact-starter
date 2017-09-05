import { h, Component } from 'preact';
import { Trans } from 'lingui-react';

export default class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <Trans>Page not found</Trans>
      </div>
    );
  }
}
