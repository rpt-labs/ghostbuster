// github sprint checking util
const getSprintDataByCohort = require('../helpers/sprintChecker');

// db
const sprints = require('../../db/models/sprints');

// SPRINTS requests TODO: error handling for all functions, delete functionality
exports.getSprints = async (req, res) => {
  const sprintData = await sprints.getAllSprints();
  res.json({ sprints: sprintData });
};

exports.createSprint = async (req, res) => {
  const { sprintName } = req.query;
  const newSprint = await sprints.addSprint(sprintName);
  res.json({ sprint: newSprint });
};

exports.updateSprint = async (req, res) => {
  const { sprintId, sprintName } = req.query;
  const updated = await sprints.updateSprint(sprintId, sprintName);
  res.json({ sprint: updated });
};

exports.deleteSprint = async (req, res) => {
  res.json({ message: 'add functionality to delete sprints' });
};

// MESSAGES requests
exports.getMessagesBySprintId = async (req, res) => {
  const { sprintId } = req.params;
  const messages = await sprints.getMessagesBySprintId(sprintId);
  res.json(messages);
};

exports.createMessage = async (req, res) => {
  const { messageText, sprintId } = req.query;
  const newMessage = await sprints.addMessage(messageText, sprintId);
  res.json({ message: newMessage });
};

exports.updateMessage = async (req, res) => {
  const { messageId, sprintId, messageText } = req.query;
  const updated = await sprints.updateMessage(messageId, messageText, sprintId);
  res.json({ message: updated });
};

exports.deleteMessage = async (req, res) => {
  res.json({ message: 'add functionality to delete new milestone message' });
};

exports.getSprintGithubData = async (req, res) => {
  let { sprintNames } = req.params;
  const { cohort } = req.query;
  sprintNames = sprintNames.split('+');

  const result = await getSprintDataByCohort(cohort, sprintNames);
  res.status(200).json(result);
};
