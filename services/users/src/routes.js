import express from 'express';
import UserController from './controllers/user.controller';
import { asyncHandler } from './utils/async-handler';
import userValidation from './validations/user.validation';

const Router = express.Router();

Router.post('/', userValidation, asyncHandler(UserController.createUser));
Router.get('/:id?', asyncHandler(UserController.getUser));
Router.put('/:id',
  userValidation,
  asyncHandler(UserController.updateUser));
Router.delete('/:id', asyncHandler(UserController.deleteUser));

export default Router;
