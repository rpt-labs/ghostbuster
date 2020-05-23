import { Grid, Button, Image, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

export const CardGrid = styled(Grid)`
  margin-bottom: 10px !important;
  margin-top: 10px !important;
  border-bottom: 1px solid lightgrey;
`;

const StyledButton = styled(Button)`
  border-radius: 50px !important;
  font-weight: bold !important;
  color: white !important;
`;
export const CompleteButton = styled(StyledButton)`
  background-color: #85d19c !important;
`;

export const ProgressButton = styled(StyledButton)`
  background-color: #ffe65b !important;
  color: #403f4c !important;
`;

export const DangerButton = styled(StyledButton)`
  background-color: #f44d63 !important;
`;

export const ProgressImage = styled(Image)`
  height: 56px !important;
  width: 56px !important;
`;

export const HourglassIcon = styled(Icon)`
  color: #d3d3d3 !important;
`;

export const CheckIcon = styled(Icon)`
  color: #85d19c !important;
`;

export const StarIcon = styled(Icon)`
  color: #ffd700 !important;
`;

export const GithubIcon = styled(Icon)`
  color: #403f4c !important;
`;

export const StarIconGreen = styled(Icon)`
  color: green !important;
`;

export const StarIconGrey = styled(Icon)`
  color: grey !important;
`;
