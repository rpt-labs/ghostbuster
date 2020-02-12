import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import PropTypes from 'prop-types';

class SignInWidget extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/no-find-dom-node
    const el = ReactDOM.findDOMNode(this);
    const { baseUrl } = this.props;
    this.widget = new OktaSignIn({
      baseUrl,
      authParams: {
        pkce: true
      }
    });
    const { onSuccess, onError } = this.props;
    this.widget.renderEl({ el }, onSuccess, onError);
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    return <div />;
  }
}

export default SignInWidget;

SignInWidget.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  baseUrl: PropTypes.string.isRequired
};
