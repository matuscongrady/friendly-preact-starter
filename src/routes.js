/* eslint-disable react/jsx-filename-extension */
import { h, Component } from 'preact';
import { Route, Switch } from 'react-router-dom';
import { loadableChunk } from 'utils';
import Home from './components/Home/Home';
import NotFound from './components/reusable/NotFound';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/counter"
          component={loadableChunk(
            import(/* webpackChunkName: "counter" */ './components/Counter/Counter.jsx')
          )}
        />
        <Route
          path="/posts"
          component={loadableChunk(
            import(/* webpackChunkName: "posts" */ './components/Posts/Posts.jsx')
          )}
        />
        <Route path="/" component={Home} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}
