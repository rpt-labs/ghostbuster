import React, { Component } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import PropTypes from 'prop-types';

export default class OktaSignInWidget extends Component {
  componentDidMount() {
    const el = this.node;
    const { baseUrl, onSuccess, onError } = this.props;
    this.widget = new OktaSignIn({
      logo:
        'https://png.pngtree.com/element_origin_min_pic/16/12/25/a993726976f4619909704e1177d63658.jpg',
      baseUrl
    });
    this.widget.renderEl({ el }, onSuccess, onError);
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    return (
      <div
        ref={n => {
          this.node = n;
        }}
      />
    );
  }
}

OktaSignInWidget.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
};
