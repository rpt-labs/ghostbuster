import React from 'react';
import PropTypes from 'prop-types';
import { List, Header } from 'semantic-ui-react';
import {
  PercentageButton, ProgressImage, CheckIcon, HourglassIcon,
} from './Styles/StudentCardStyles';

const Progress = (props) => {
  const { student } = props;
  let percentageButton;
  let icon;

  // dynamically render button with percentage complete
  if (student.percentComplete >= 85) {
    percentageButton = <PercentageButton positive size="mini">{`${student.percentComplete}%`}</PercentageButton>;
  } else if (student.percentComplete >= 50) {
    percentageButton = <PercentageButton color="yellow" size="mini">{`${student.percentComplete}%`}</PercentageButton>;
  } else {
    percentageButton = <PercentageButton negative size="mini">{`${student.percentComplete}%`}</PercentageButton>;
  }

  // dynamically render progress icon
  if (student.BMR) {
    icon = <CheckIcon name="check circle outline" size="huge" />;
  } else if (student.percentComplete === 0) {
    icon = (
      <ProgressImage
        src="https://png.pngtree.com/element_origin_min_pic/16/12/25/a993726976f4619909704e1177d63658.jpg"
        size="tiny"
        circular
        centered
      />
    );
  } else {
    icon = <HourglassIcon name="hourglass outline" size="huge" />;
  }

  return (
    <React.Fragment>
      <List textAlign="center">
        <List.Item>
          {icon}
        </List.Item>
        <List.Item>
          <Header as="h3">{student.name}</Header>
        </List.Item>
        <List.Item>
          {percentageButton}
        </List.Item>
      </List>
    </React.Fragment>
  );
};

Progress.propTypes = {
  student: PropTypes.instanceOf(Object).isRequired,
};

export default Progress;
