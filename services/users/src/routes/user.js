import express from 'express';
import userController from '../controllers/user.controller';
import userValidation from '../validations/user.validation';

const Router = express.Router();

Router.post('/', userValidation, userController.createUser);
Router.get('/:id?', userController.getUser);
Router.put('/:id', userValidation, userController.updateUser);
Router.delete('/:id', userController.deleteUser);

export default Router;
