# ghostbuster

This tool helps identify students who might be ghosting, struggling or otherwise flying under the radar during the sprint phase of the program as well as the group phase of the program. This tool is intended to alert support staff to investigate more deeply and is not intended as a judgment or diagnostic.

# Prerequisites
You'll need to set up four things:

* Three config files in server/config, modeled after the example.config files:
  * ```cohorts.js```
  * ```sprints.js```
  * ```teams.js```

* Add GITHUB_AUTH_TOKEN to your .env file

Each time a cohort enters a new part of the project phase, you can update their info in the appropriate place in ```server/config/teams.js``` and the ghostbuster will automatically check them all

Each time a new cohort begins the RPT program, you can add their info to ```server/config/cohorts.js```.  Each time a cohort graduates, their info can be optionally removed from this file.  Be sure to import the new cohorts into checkSprints.js.

When sprints change, or are added or removed, simply adjust the commit milesone messages in ```server/config.sprints.js``` to match the changes in Learn.

# Installing
run npm install

Running the ghostbuster for projects- to see data by team for the previous week
run this command from the root of the project ```node ghostbuster```

Running the checker - to see lifetime contributions by student
run this command from the root of the project ```node contributions```

Running the sprint checker - to see student progress on sprints. For each cohort you want to check, at the bottom of checkSprints.js call printForCohort with that cohort name, and an array with a list of all sprints you'd like to check.  If you pass in true as a third argument, it will print a detailed list of each student's commit messages.
``` printForCohort(COHORT, ['name-of-sprint-here', 'name-of-second-sprint-here], true);```
run this command from the root of the project ```node checkSprints```

# Limitations
This tool currently only checks the default branch (master) of each repo for project phase.

This tool currently relies on legacy projects working off their own copy of the original repo.  If a legacy team works directly with source code of the original greenfield, the stats will be inaccurate.

This tool currently relies on students properly using the milestone commits for sprints for accurate stats on their progress.

# Customizing
* Right now the tool checks for the previous week's commits in projects. You can change the duration by adjusting the daysAgo variable in ghostBuster.js. A future iteration could have a customizable range by inputing a start date and end date to the github query
* I'm not sure if it's worth the effort to have this tool dynamically pull student data from google sheets, but if at some point it feels worth it, that could be a next step
* This tool does not analyze code quality for project phase - merely counts the number of commits and number of code changes.
* This tool does not analyze code quality for sprints - merely checks progress by milestone commit messages.

# Running ghostbuster locally without okta auth

* Clone the ghostbuster repo.
* Run npm install in the root directory.
* In root directory create a .env file (contact the maintainer for the configuration parameters)
* Copy sprints.js and cohorts.js in /server/config folder. [do not push up this data to github] (contact the maintainer)
* In ```index.jsx``` comment line 4 and uncomment line 5
* Run npm ```run build``` and ```npm run dev``` in 2 separate terminal windows.
* Launch the app on http://localhost:1234/
   - Sprints: http://localhost:1234/sprints
   - Toy problems: http://localhost:1234/toyproblems
