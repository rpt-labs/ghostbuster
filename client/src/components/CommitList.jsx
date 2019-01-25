import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import { GithubIcon, StarIcon } from './Styles/StudentCardStyles';

const CommitList = (props) => {
  const {
    commits,
    url,
    show,
    handleCommitChange,
  } = props;

  const commitList = show ? commits.map((commit, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <List.Item key={index}>
      <StarIcon name="star" />
      <List.Content style={{ textAlign: 'left' }}>
        <a target="_blank" rel="noopener noreferrer" href={url}>
          {commit}
        </a>
      </List.Content>
    </List.Item>
  )) : <List />;

  return (
    <React.Fragment>
      <List divided relaxed>
        {commitList}
        <GithubIcon name="github" size="huge" onClick={handleCommitChange} />
      </List>
    </React.Fragment>
  );
};

CommitList.propTypes = {
  commits: PropTypes.instanceOf(Object).isRequired,
  url: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  handleCommitChange: PropTypes.func.isRequired,
};

export default CommitList;
