import React from 'react';
import PropTypes from 'prop-types';

const CommitList = (props) => {
  const {
    commits,
    url,
    show,
    handleCommitChange,
  } = props;

  const commitList = show ? commits.map(commit => (
    <div className="item">
      <i className="star blue middle aligned icon" />
      <div className="content">
        <a target="_blank" rel="noopener noreferrer" href={url}>
          <p className="description">{commit}</p>
        </a>
      </div>
    </div>
  )) : <div />;

  return (
    <div id="commit-list">
      <div className="ui relaxed divided list">
        {commitList}
        <i id="github-button" role="presentation" onClick={handleCommitChange} className="huge github icon" />
      </div>
    </div>
  );
};

CommitList.propTypes = {
  commits: PropTypes.instanceOf(Object).isRequired,
  url: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  handleCommitChange: PropTypes.func.isRequired,
};

export default CommitList;
