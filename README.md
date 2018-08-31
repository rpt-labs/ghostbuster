# ghostbuster

This tool helps identify students who might be ghosting, struggling or otherwise flying under the radar during the group phase of the program. This tool is intended to alert support staff to investigate more deeply and is not intended as a judgment or diagnostic.

# Prerequisites
You'll need to set up two things:

* A config folder at the root of the project with a config.js file inside. In this config file, paste your token for the github API in the following format:
```
module.exports = {
  GITHUB_TOKEN:  'your_token_here'
}
```
* A teams.js file at the root of the project
three variables, exported as module.exports: thesisTeams, greenfieldTeams, legacyTeams
Each of these variables takes the following format:
```
thesisTeams: {
  team_name_here: {
    github: "github_org_name_here",
    students: [
      {
        firstName: "student_first_name_here",
        github: "student_github_handle_here"
      }
    ]
  }
}  
```
Each time a cohort enters a new part of the project phase, you can update their info in the appropriate place in teams.js and the ghostbuster will automatically check them all
# Installing
run npm install

Running the ghostbuster - to see data by team for the previous week
run this command from the root of the project ```node ghostbuster```

Running the contributions checker - to see lifetime contributions by student
run this command from the root of the project ```node contributions```

# Limitations
This tool currently only checks the default branch (master) of each repo.

# Customizing
* Right now the tool checks for the previous week's code. You can change the duration by adjusting the daysAgo variable in ghostBuster.js. A future iteration could have a customizable range by inputing a start date and end date to the github query
* I'm not sure if it's worth the effort to have this tool dynamically pull student data from google sheets, but if at some point it feels worth it, that could be a next step
* This tool does not analyze code quality - merely counts the number of commits and number of code changes.
