import React from 'react';
import { Button } from 'semantic-ui-react';

const COHORTS = ['RPT13', 'RPT14', 'RPT15'];

function ToyProblems() {
  return (
    <div>
      {COHORTS.map(cohort => {
        return (
          <Button primary key={cohort}>
            {cohort}
          </Button>
        );
      })}
    </div>
  );
}

export default ToyProblems;
