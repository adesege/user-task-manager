import express from 'express';
import userTaskController from '../controllers/user-task.controller';
import taskValidation from '../validations/task.validation';

const Router = express.Router();

Router.post('/:userId/tasks', taskValidation, userTaskController.createTask);
Router.get('/:userId/tasks', userTaskController.getTask);
Router.put('/:userId/tasks/:taskId',
  taskValidation,
  userTaskController.updateTask);
Router.delete('/:userId/tasks/:taskId', userTaskController.deleteTask);


export default Router;
