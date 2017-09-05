import { h, Component } from 'preact';

export default class Error extends Component {
  render({ children }) {
    return (
      <div>
        <p className="error">{children}</p>
      </div>
    );
  }
}
