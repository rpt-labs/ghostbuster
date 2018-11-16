//github sprint checking util
const getSprintDataByCohort= require('../helpers/sprintChecker');

//db
const sprints = require('../../db/models/sprints');

//SPRINTS requests TODO: error handling for all functions, delete functionality
exports.getSprints = async(req, res, next) => {
  const sprintData = await sprints.getAllSprints();
  res.json({ sprints: sprintData });
};

exports.createSprint = async(req, res, next) => {
  const { sprint_name } = req.query;
  const newSprint = await sprints.addSprint(sprint_name);
  res.json({sprint: newSprint});
};

exports.updateSprint = async(req, res, next) => {
  const { sprint_id, sprint_name } = req.query;
  const updated = await sprints.updateSprint(sprint_id, sprint_name);
  res.json({sprint: updated});
};

exports.deleteSprint = async(req, res, next) => {
  res.json({message: "add functionality to delete sprints" });
};

//MESSAGES requests
exports.getMessagesBySprintId = async(req, res, next) => {
  const { sprintId } = req.params;
  const messages = await sprints.getMessagesBySprintId(sprintId);
  res.json(messages);
};

exports.createMessage = async(req, res, next) => {
  const { message_text, sprint_id } = req.query;
  const newMessage = await sprints.addMessage(message_text, sprint_id);
  res.json({message: newMessage});
}

exports.updateMessage = async(req, res, next) => {
  const { message_id, sprint_id, message_text } = req.query;
  const updated = await sprints.updateMessage(message_id, message_text, sprint_id);
  res.json({message: updated});
}

exports.deleteMessage = async(req, res, next) => {
  res.json({message: "add functionality to delete new milestone message"});
}

exports.getSprintGithubData = async(req, res, next) => {
  let { sprintNames } = req.params;
  const { cohort } = req.query;
  sprintNames = sprintNames.split('+');

  let result = await getSprintDataByCohort(cohort, sprintNames);
  res.status(200).json(result);
};
