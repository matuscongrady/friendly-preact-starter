import { h, Component } from 'preact';
import { Trans } from 'lingui-react';
import { gql } from 'react-apollo';
import { withData } from 'utils';

@withData(gql`
  {
    allPosts {
      id
      description
    }
  }
`)
export default class Posts extends Component {
  render({ data }) {
    return (
      <div>
        <h3>
          <Trans>Posts from graphql API</Trans>:
        </h3>
        <ul>{data.allPosts.map(post => <li key={post.id}>{post.description}</li>)}</ul>
      </div>
    );
  }
}
