import { h, Component } from 'preact';
import { Trans } from 'lingui-react';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h3>
          <Trans>Welcome, preact developer!</Trans>
        </h3>
      </div>
    );
  }
}
