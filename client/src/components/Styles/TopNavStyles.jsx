import styled from 'styled-components';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const TopNavMenu = styled(Menu)`
  background-color: #393942 !important;
  padding: 30px !important;
  border-radius: 0px !important;
  color: white !important;
`;

export const StyledLink = styled(Link)`
  color: white !important;
  padding: 0px 20px;
  font-size: 18px;
`;
