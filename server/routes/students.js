const { Router } = require('express');

const studentsRouter = Router();
const cohortsController = require('../controllers/cohortsController');

// student information TODO: delete functionality
studentsRouter.get('/', cohortsController.getStudents);
studentsRouter.post('/', cohortsController.createStudent);
studentsRouter.put('/', cohortsController.updateStudent);
studentsRouter.delete('/', cohortsController.deleteStudent);

module.exports = studentsRouter;
