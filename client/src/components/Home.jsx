import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>How to use</h1>
      <h3>Check sprints</h3>
      <p>You can check one or more sprints at a time for each cohort in the sprint phase, by selecting the radio buttons.  Please be aware that this is process and time intensive and takes a long time to load.  Once we have data storage for the Github data, this will be much faster.</p>

      <p>Once it loads, you can expand to see each student's commit history by clicking the github button next to their name.  Apologies ahead of time because design it's not great UI/UX design.  Anybody want to make it better???</p>

      <h3>Check teams</h3>
      <p>The projects tab will allow you to view the lifetime commit history of each team, as well as the last week's worth of commits and code changes.  This one takes even longer to check... once again, once we have date storage this will be much faster</p>

      <h3>If it's out of date</h3>
      <p>If this is still running with config files, the deployed repo will need to add new data to its config files, for example, add new students/cohorts.</p>
    </div>
  );
};

export default Home;