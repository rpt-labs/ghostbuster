import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import { Menu } from 'semantic-ui-react';

const TopNav = props => (
  <Menu style={{ backgroundColor: '#393942', padding: '30px', borderRadius: '0px' }}>
    <h1 style={{ color: 'white' }}>Ghostbuster</h1>
    <Menu.Menu position="right">
      <Menu.Item>
        <Link to="/sprints" style={{ color: 'white', padding: '0px 20px', fontSize: '18px' }}>
          Sprints
        </Link>
        <Link to="/projects" style={{ color: 'white', padding: '0px 20px', fontSize: '18px' }}>
          Projects
        </Link>
        <Link to="/login" onClick={() => props.auth.logout('/login')} style={{ color: 'white', padding: '0px 20px', fontSize: '18px' }}>
          Logout
        </Link>
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

TopNav.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default withAuth(TopNav);
