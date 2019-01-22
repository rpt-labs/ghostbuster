import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Icon, Image, List, Header,
} from 'semantic-ui-react';

const Progress = (props) => {
  const { student } = props;
  let percentageButton;
  let icon;

  // dynamically render button with percentage complete
  if (student.percentComplete >= 85) {
    percentageButton = <Button positive size="mini" style={{ borderRadius: '50px' }}>{`${student.percentComplete}%`}</Button>;
  } else if (student.percentComplete >= 50) {
    percentageButton = <Button color="yellow" size="mini" style={{ borderRadius: '50px' }}>{`${student.percentComplete}%`}</Button>;
  } else {
    percentageButton = <Button negative size="mini" style={{ borderRadius: '50px' }}>{`${student.percentComplete}%`}</Button>;
  }

  // dynamically render progress icon
  if (student.BMR) {
    icon = <Icon name="check circle outline" style={{ color: '#85D19C' }} size="huge" />;
  } else if (student.percentComplete === 0) {
    icon = (
      <Image
        src="https://png.pngtree.com/element_origin_min_pic/16/12/25/a993726976f4619909704e1177d63658.jpg"
        size="tiny"
        circular
        centered
        style={{ height: '56px', width: '56px' }}
      />
    );
  } else {
    icon = <Icon name="hourglass outline" style={{ color: 'lightgrey' }} size="huge" />;
  }

  return (
    <React.Fragment>
      <List>
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
