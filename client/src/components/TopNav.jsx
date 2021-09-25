import { Menu } from 'semantic-ui-react';
import { TopNavMenu, StyledLink, DisabledStyledLink } from './Styles/TopNavStyles';

const TopNav = () => (
  <TopNavMenu>
    <h1>Ghostbuster</h1>
    <Menu.Menu position="right">
      <Menu.Item>
        <DisabledStyledLink to="/admin">Admin</DisabledStyledLink>
        <DisabledStyledLink to="/attendance">Attendance</DisabledStyledLink>
        <StyledLink to="/sprints">Sprints</StyledLink>
        <StyledLink to="/projects">Projects</StyledLink>
        <StyledLink to="/toyproblems">Toy Problems</StyledLink>
      </Menu.Item>
    </Menu.Menu>
  </TopNavMenu>
);

export default TopNav;
