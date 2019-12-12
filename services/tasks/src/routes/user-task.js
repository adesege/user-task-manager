import express from 'express';
import userTaskController from '../controllers/user-task.controller';
import { asyncHandler } from '../utils/async-handler';
import taskValidation from '../validations/task.validation';

const Router = express.Router();

Router.post('/:userId/tasks',
  taskValidation,
  asyncHandler(userTaskController.createTask));
Router.get('/:userId/tasks', asyncHandler(userTaskController.getTask));
Router.put('/:userId/tasks/:taskId',
  taskValidation,
  asyncHandler(userTaskController.updateTask));
Router.delete('/:userId/tasks/:taskId',
  asyncHandler(userTaskController.deleteTask));


export default Router;
