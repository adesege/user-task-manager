import models from '../models';
import taskRepository from '../repositories/task.repository';
import handleError from '../utils/handle-error';

const { sequelize } = models;

export default {
  async createTask(req, res) {
    try {
      const checkTaskExist = await taskRepository.findOne({
        where: {
          description: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('description')),
            '=',
            req.body.description.toLowerCase(),
          ),
          state: req.body.state,
          userId: req.params.userId,
        },
      });
      if (checkTaskExist) {
        return handleError(res, {
          custom: true,
          error: 'A similar task already exist',
          status: 409,
        });
      }

      const task = await taskRepository.insert({
        ...req.body,
        userId: req.params.userId,
      });

      return res
        .status(200)
        .send({ message: 'Task created successfully', data: task });
    } catch (error) {
      return handleError(res, error);
    }
  },
  async getTask(req, res) {
    const { userId } = req.params;
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const offset = (page - 1) * limit;
    try {
      const result = await taskRepository.findAndCountAll({
        where: { userId },
        limit,
        offset,
      });

      if (!result.rows.length) {
        return handleError(res, {
          custom: true,
          error: 'No task has been added for this user',
          status: 404,
        });
      }

      return res.json({
        message: 'Success',
        data: {
          totalCount: result.count,
          tasks: result.rows,
          page,
          limit,
        },
      });
    } catch (error) {
      return handleError(res, error);
    }
  },
  async updateTask(req, res) {
    try {
      const { userId, taskId } = req.params;
      const task = await taskRepository.findOne({ id: taskId, userId });
      if (!task) {
        return handleError(res, {
          custom: true,
          error: 'Task not found',
          status: 404,
        });
      }
      await taskRepository.update(req.body, {
        where: {
          id: taskId,
          userId,
        },
      });

      return res.json({
        message: 'Success',
      });
    } catch (error) {
      return handleError(res, error);
    }
  },
  async deleteTask(req, res) {
    try {
      const { userId, taskId } = req.params;
      const task = await taskRepository.findOne({
        where: {
          id: taskId, userId,
        },
      });
      if (!task) {
        return handleError(res, {
          custom: true,
          error: 'Task not found',
          status: 404,
        });
      }
      await taskRepository.delete({ where: { id: taskId, userId } });
      return res.json({
        message: 'Success',
      });
    } catch (error) {
      return handleError(res, error);
    }
  },
};
