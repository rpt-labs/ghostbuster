/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import SignInWidget from './SignInWidget';

export default withAuth(
  class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        authenticated: null
      };
      this.checkAuthentication();
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    // eslint-disable-next-line consistent-return
    onSuccess = res => {
      if (res.status === 'SUCCESS') {
        const { auth } = this.props;
        return auth.redirect({
          sessionToken: res.session.token
        });
      }
    };

    onError = err => {
      // eslint-disable-next-line no-console
      console.log('error logging in', err);
    };

    async checkAuthentication() {
      const { auth } = this.props;
      const authenticated = await auth.isAuthenticated();
      // eslint-disable-next-line react/destructuring-assignment
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    }

    render() {
      const { baseUrl } = this.props;
      const { authenticated } = this.state;
      if (authenticated === null) return null;
      return authenticated ? (
        <Redirect to={{ pathname: '/' }} />
      ) : (
        <SignInWidget baseUrl={baseUrl} onSuccess={this.onSuccess} onError={this.onError} />
      );
    }
  }
);
