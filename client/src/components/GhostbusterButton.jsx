import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Image, Header, Segment,
} from 'semantic-ui-react';

const GhostbusterButton = (props) => {
  const { clickHandler } = props;

  return (
    <Segment style={{
      borderColor: '#F44D63', borderWidth: '1px', marginTop: '30px', marginBottom: '30px',
    }}
    >
      <Header as="h2" textAlign="center">
        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8J9vA9QPiEykz90ij9IRaR3tMKt_kqA0Xpoe0Ha35owi_bWLa" />
        <Header.Content>
          Who you gonna call?
        </Header.Content>
        <Button primary onClick={e => clickHandler(e)} style={{ marginLeft: '30px' }}>GHOSTBUSTER</Button>
      </Header>
    </Segment>
  );
};

GhostbusterButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};

export default GhostbusterButton;
