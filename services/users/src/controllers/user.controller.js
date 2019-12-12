import models from '../models';
import userRepository from '../repositories/user.repository';
import handleError from '../utils/handle-error';

const { sequelize } = models;

export default {
  async createUser(req, res) {
    try {
      const { name } = req.body;
      const findByName = await userRepository.findOne({
        where: {
          name: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('name')),
            'LIKE',
            `%${name.toLowerCase()}%`,
          ),
        },
      });
      if (findByName) {
        return handleError(res, {
          custom: true,
          error: `User with name "${name}" already exist`,
          status: 409,
        });
      }

      const user = await userRepository.insert({ name });
      return res
        .status(200)
        .send({ message: 'User created successfully', data: user });
    } catch (error) {
      return handleError(res, error);
    }
  },
  async getUser(req, res) {
    const { id } = req.params;
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const offset = (page - 1) * limit;
    const whereClause = id ? { id } : undefined;
    try {
      const result = await userRepository.findAndCountAll({
        where: whereClause,
        limit,
        offset,
      });

      if (id && !result.rows.length) {
        return handleError(res, {
          custom: true,
          error: 'User not found',
          status: 404,
        });
      }

      return res.json({
        message: 'Success',
        data: {
          totalCount: result.count,
          users: result.rows,
          page,
          limit,
        },
      });
    } catch (error) {
      return handleError(res, error);
    }
  },
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const user = await userRepository.findById(id);
      if (!user) {
        return handleError(res, {
          custom: true,
          error: 'User not found',
          status: 404,
        });
      }
      await userRepository.update(req.body, {
        where: {
          id,
        },
      });

      return res.json({
        message: 'Success',
      });
    } catch (error) {
      return handleError(res, error);
    }
  },
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await userRepository.findById(id);
      if (!user) {
        return handleError(res, {
          custom: true,
          error: 'User not found',
          status: 404,
        });
      }
      await userRepository.delete({ where: { id } });
      return res.json({
        message: 'Success',
      });
    } catch (error) {
      return handleError(res, error);
    }
  },
};
