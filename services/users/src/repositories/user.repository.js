import models from '../models';

const { User } = models;

export default {
  insert(options) {
    return User.create(options);
  },
  findAndCountAll(options) {
    return User.findAndCountAll(options);
  },
  findById(param, options) {
    return User.findByPk(param, options);
  },
  findOne(options) {
    return User.findOne(options);
  },
  update(values, options) {
    return User.update(values, options);
  },
  delete(options) {
    return User.destroy(options);
  },
};
