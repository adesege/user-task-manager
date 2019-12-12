import Joi from '@hapi/joi';
import handleError from '../utils/handle-error';

export default async (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().trim().required(),
  }).required();

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return handleError(res, error);
  }
  return next();
};
