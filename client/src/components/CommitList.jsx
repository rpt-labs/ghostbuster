import React from 'react';
import PropTypes from 'prop-types';
import { List, Label, Icon } from 'semantic-ui-react';
import { StarIcon } from './Styles/StudentCardStyles';

const CommitList = props => {
  const { commits, url, show, handleCommitChange } = props;

  const commitList = show ? (
    commits.map(commit => (
      <List.Item>
        <StarIcon name="star" />
        <List.Content style={{ textAlign: 'left' }}>
          <a target="_blank" rel="noopener noreferrer" href={url}>
            {commit}
          </a>
        </List.Content>
      </List.Item>
    ))
  ) : (
    <List />
  );

  return (
    <React.Fragment>
      <Label as="a" color="teal" onClick={handleCommitChange} size="large">
        <Icon name="github" />
        Total # of Commits:
        <Label.Detail>{commits.length ? commits.length : 0}</Label.Detail>
      </Label>
      <List divided relaxed>
        {commitList}
      </List>
    </React.Fragment>
  );
};

CommitList.propTypes = {
  commits: PropTypes.instanceOf(Object).isRequired,
  url: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  handleCommitChange: PropTypes.func.isRequired
};

export default CommitList;
