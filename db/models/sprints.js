const { query } = require('../index');

module.exports = {
  getAllSprints: async () => {
    try {
      const sprintQuery = await query('SELECT * FROM sprints ORDER BY id ASC');
      return sprintQuery.rows;
    } catch (err) {
      console.log(err.detail || err);
      return err;
    }
  },
  getSprintById: async (sprintId) => {
    try {
      const sprint = await query(`SELECT * FROM sprints WHERE id=${sprintId}`);
      return sprint.rows[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  addSprint: sprintName => query(`
      INSERT INTO sprints (sprint_name)
      VALUES (
        '${sprintName}'
      )`)
    .then(() => query(`
        SELECT * FROM sprints WHERE sprint_name='${sprintName}'
      `).then(res => res.rows[0])
      .catch(err => err))
    .catch(err => err),
  updateSprint: async (sprintId, newSprintName) => {
    // update sprint
    try {
      const update = await query(`
        UPDATE sprints SET sprint_name= '${newSprintName}'
        WHERE id = ${sprintId}
      `);
      if (update.rowCount) {
        console.log(`Updated sprint ${sprintId}`);
      } else {
        return 'unable to update sprint record';
      }
    } catch (error) {
      console.log(error);
      return error;
    }

    // retrieve updated sprint
    try {
      const sprint = await module.exports.getSprintById(sprintId);
      return sprint;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  // deleteSprint: async (sprintId) => 'add functionality to delete sprint',

  getMessagesBySprintId: async (sprintId) => {
    try {
      const messageQuery = await query(`
        SELECT * FROM messages
        WHERE sprint_id=${sprintId}
        ORDER BY id ASC`);
      return messageQuery.rows;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  addMessage: (messageText, sprintId) => query(`
      INSERT INTO messages (message_text, sprint_id)
      VALUES (
        '${messageText}',
        ${sprintId}
      )`)
    .then(() => query(`
        SELECT * FROM messages WHERE sprint_id=${sprintId}
      `).then(res => res.rows)
      .catch(err => err))
    .catch(err => err),
  updateMessage: async (messageId, newMessageText, sprintId) => {
    // update the message
    try {
      const update = await query(`
        UPDATE messages SET (message_text, sprint_id) = (
          '${newMessageText}',
          ${sprintId}
        ) WHERE id = ${messageId}
      `);

      if (update.rowCount) {
        console.log(`Updated message ${messageId}`);
      } else {
        return 'unable to update sprint record';
      }
    } catch (error) {
      console.log(error);
      return error.detail || error;
    }

    // retrieve updated message
    try {
      const updated = await query(`
        SELECT * FROM messages WHERE id=${messageId}
      `);
      return updated.rows[0];
    } catch (error) {
      console.log(error);
      return error || error.detail;
    }
  },
  // deleteMessage: async messageId => 'add funcitonality to delete message',

  getSprintWithMessages: async (sprintId) => {
    let sprint;
    let messages;
    // retrieve team
    try {
      sprint = await module.exports.getSprintById(sprintId);
    } catch (error) {
      console.log(error);
    }

    // retreive related messages
    try {
      messages = await module.exports.getMessagesBySprintId(sprintId);
    } catch (error) {
      console.log(error);
    }
    return { sprint, messages };
  },
};
