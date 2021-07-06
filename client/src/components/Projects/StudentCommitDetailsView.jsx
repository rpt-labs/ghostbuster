import PropTypes from 'prop-types';
import { List, Header } from 'semantic-ui-react';

const StudentCommitDetailsView = ({ commitDetails, url }) => (
  <>
    {commitDetails[url.replace('https://github.com/', '')] &&
      commitDetails[url.replace('https://github.com/', '')].length > 0 && (
        <List.Description
          style={{
            fontWeight: 'bold',
            color: 'grey'
          }}
        >
          Latest commits:
        </List.Description>
      )}
    <List divided relaxed>
      {(commitDetails[url.replace('https://github.com/', '')] || [])
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10)
        .map(commit => (
          <List.Item key={commit.date}>
            <List.Content style={{ textAlign: 'left' }}>
              {`${commit.date.split('T')[0]} - ${commit.name}`}
            </List.Content>
          </List.Item>
        ))}
    </List>
    {commitDetails[url.replace('https://github.com/', '')].length > 10 && (
      <Header size="tiny" as="a" target="_blank" href={url}>
        {`${commitDetails[url.replace('https://github.com/', '')].length - 10} more`}
      </Header>
    )}
  </>
);

export default StudentCommitDetailsView;

StudentCommitDetailsView.propTypes = {
  commitDetails: PropTypes.instanceOf(Object).isRequired,
  url: PropTypes.string.isRequired
};
