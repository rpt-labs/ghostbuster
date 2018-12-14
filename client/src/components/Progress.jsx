import React from 'react';
import PropTypes from 'prop-types';

const Progress = (props) => {
  const { student } = props;
  let buttonStyle;
  let icon;

  // dynamically render button with percentage complete
  if (student.percentComplete >= 85) {
    buttonStyle = 'circular ui mini button complete-button';
  } else if (student.percentComplete >= 50) {
    buttonStyle = 'circular ui mini button progress-button';
  } else {
    buttonStyle = 'circular ui mini button danger-button';
  }

  // dynamically render progress icon
  if (student.BMR) {
    icon = (<i style={{ color: '#85D19C' }} className="huge check circle outline icon" />);
  } else if (student.percentComplete === 0) {
    icon = <img className="ui middle aligned circular image" alt="progress" src="https://png.pngtree.com/element_origin_min_pic/16/12/25/a993726976f4619909704e1177d63658.jpg" />;
  } else {
    icon = (<i style={{ color: 'lightgrey' }} className="huge hourglass outline icon" />);
  }

  return (
    <div className="progress">
      <div className="ui list">
        <div className="item">
          <div className="card-image">
            {icon}
          </div>
        </div>
        <div className="item">
          <div className="ui header">
            {student.name}
          </div>
        </div>
        <div className="item">
          <div className={buttonStyle}>
            {`${student.percentComplete}%`}
          </div>
        </div>
      </div>
    </div>

  );
};

Progress.propTypes = {
  student: PropTypes.instanceOf(Object).isRequired
};

export default Progress;
