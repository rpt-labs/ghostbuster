import React from 'react';
import PropTypes from 'prop-types';
import { Image, Header } from 'semantic-ui-react';
import { ButtonSegment, ButtonPrimary } from '../Styles/GhostBusterButtonStyles';

const GhostbusterButton = props => {
  const { clickHandler } = props;

  return (
    <ButtonSegment>
      <Header as="h2" textAlign="center">
        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8J9vA9QPiEykz90ij9IRaR3tMKt_kqA0Xpoe0Ha35owi_bWLa" />
        <Header.Content>Who you gonna call?</Header.Content>
        <ButtonPrimary primary onClick={e => clickHandler(e)}>
          GHOSTBUSTER
        </ButtonPrimary>
      </Header>
    </ButtonSegment>
  );
};

GhostbusterButton.propTypes = {
  clickHandler: PropTypes.func.isRequired
};

export default GhostbusterButton;
