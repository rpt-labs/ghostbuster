import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import PropTypes from 'prop-types';
import OktaSignInWidget from './OktaSignInWidget';

class Login extends Component {
  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.state = {
      authenticated: null,
    };
    this.checkAuthentication();
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  onSuccess(res) {
    const { auth } = this.props;
    if (res.status === 'SUCCESS') {
      return auth.redirect({
        sessionToken: res.session.token,
      });
    }
    // The user can be in another authentication state that requires further action.
    // For more information about these states, see:
    // https://github.com/okta/okta-signin-widget#rendereloptions-success-error
    return null;
  }

  onError() {
    throw this.err;
    // console.log('error logging in', this.err);
  }

  async checkAuthentication() {
    const { auth } = this.props;
    const isAuthenticated = await auth.isAuthenticated();
    const { authenticated } = this.state;
    if (isAuthenticated !== authenticated) {
      this.setState({ authenticated: isAuthenticated });
    }
  }

  render() {
    const { authenticated } = this.state;
    const { baseUrl } = this.props;
    if (authenticated === null) return null;
    return authenticated
      ? <Redirect to={{ pathname: '/' }} />
      : (
        <OktaSignInWidget
          baseUrl={baseUrl}
          onSuccess={this.onSuccess}
          onError={this.onError}
        />
      );
  }
}

Login.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
  baseUrl: PropTypes.string.isRequired,
};

export default withAuth(Login);
