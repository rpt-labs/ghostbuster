import React from 'react';
import PropTypes from 'prop-types';

const StudentCard = (props) => {
  const { student, repoName } = props;
  const buttonStyle = student.percentComplete >= 85 ? 'green circular ui tiny button'
    : student.percentComplete >= 50 ? 'yellow circular ui tiny button'
      : 'red circular ui tiny button';
  const githubUrl = `http://www.github.com${student.github}/${student.cohort}-${repoName}`;
  const imageUrl = student.BMR ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Pink_checkbox-checked.svg/2000px-Pink_checkbox-checked.svg.png'
    : student.percentComplete === 0 ? 'https://png.pngtree.com/element_origin_min_pic/16/12/25/a993726976f4619909704e1177d63658.jpg'
      : 'https://cdn1.iconfinder.com/data/icons/business-colored-icons-vol-2/128/085-512.png';

  const messageList = student.commitMessages.map(message => <p>{message}</p>);

  return (
    <div className="ui segment fluid">
      <div className="ui two column stackable center aligned grid">
        <div className="ui vertical divider">
          <i style={{fontSize: 62}} className="github icon" />
        </div>
        <div className="middle aligned row">
          <div className="column">
            <div className="card-image">
              <img alt="progress" src={imageUrl} />
            </div>
            <div className="ui header">
              {student.name}
            </div>
            <div className={buttonStyle}>
              {`${student.percentComplete}%`}
            </div>
          </div>

          <div className="column">
            <div className="image">
              {messageList}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

StudentCard.propTypes = {
  student: PropTypes.instanceOf(Object).isRequired,
  repoName: PropTypes.string.isRequired,
};

export default StudentCard;
