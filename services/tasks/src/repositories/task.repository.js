import models from '../models';

const { Task } = models;

export default {
  insert(options) {
    return Task.create(options);
  },
  findAndCountAll(options) {
    return Task.findAndCountAll(options);
  },
  findById(param, options) {
    return Task.findByPk(param, options);
  },
  findOne(options) {
    return Task.findOne(options);
  },
  update(values, options) {
    return Task.update(values, options);
  },
  delete(options) {
    return Task.destroy(options);
  },
};
