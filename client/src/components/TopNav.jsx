import React from 'react';
import PropTypes from 'prop-types';
import { withAuth } from '@okta/okta-react';
import { Menu } from 'semantic-ui-react';
import { TopNavMenu, StyledLink } from './Styles/TopNavStyles';

const TopNav = props => (
  <TopNavMenu>
    <h1>Ghostbuster</h1>
    <Menu.Menu position="right">
      <Menu.Item>
        <StyledLink to="/admin">
          Admin
        </StyledLink>
        <StyledLink to="/attendance">
          Attendance
        </StyledLink>
        <StyledLink to="/sprints">
          Sprints
        </StyledLink>
        <StyledLink to="/projects">
          Projects
        </StyledLink>
        <StyledLink to="/login" onClick={() => props.auth.logout('/login')}>
          Logout
        </StyledLink>
      </Menu.Item>
    </Menu.Menu>
  </TopNavMenu>
);

TopNav.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default withAuth(TopNav);
