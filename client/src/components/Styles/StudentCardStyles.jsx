import {
  Grid, Button, Image, Icon,
} from 'semantic-ui-react';
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
  background-color: #85D19C !important;
  `;

export const ProgressButton = styled(StyledButton)`
  background-color: #FFE65B !important;
  color: #403F4C !important;
  `;

export const DangerButton = styled(StyledButton)`
  background-color: #F44D63 !important;
  `;

export const ProgressImage = styled(Image)`
  height: 56px !important;
  width: 56px !important; 
  `;

export const HourglassIcon = styled(Icon)`
  color: #D3D3D3 !important;
  `;

export const CheckIcon = styled(Icon)`
  color: #85D19C !important;
  `;

export const GithubIcon = styled(Icon)`
  color: #403F4C !important;
  `;

export const StarIcon = styled(Icon)`
  color: #2185D0 !important;
  `;
