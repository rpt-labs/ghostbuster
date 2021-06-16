import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import { StyledHeader, StyledList } from '../Styles/TeamStyles';
import sprints from '../../../../server/config/sprints';

const MilestoneCommitMessages = props => {
  const { sprint } = props;
  const { messages } = sprints.allSprints[sprint];
  const messageList = messages.map(message => (
    <List.Item key={message.message}>{message.message}</List.Item>
  ));
  return (
    <>
      <StyledHeader as="h2">Milestone Commit Messages</StyledHeader>
      <StyledList>{messageList}</StyledList>
    </>
  );
};

MilestoneCommitMessages.propTypes = {
  sprint: PropTypes.string.isRequired
};

export default MilestoneCommitMessages;
