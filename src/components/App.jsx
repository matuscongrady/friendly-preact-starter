import { h, Component } from 'preact';
import { Trans } from 'lingui-react';
import { Link, withRouter } from 'react-router-dom';
import Routes from '../routes';

@withRouter
export default class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/">
            <Trans>Home</Trans>
          </Link>
          <Link to="/counter">
            <Trans>Counter</Trans>
          </Link>
          <Link to="/posts">
            <Trans>Posts</Trans>
          </Link>
        </header>
        <Routes />
      </div>
    );
  }
}
