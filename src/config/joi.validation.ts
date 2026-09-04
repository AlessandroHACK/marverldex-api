import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.string().uri().required(),
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string().valid('dev', 'prod', 'test').default('dev'),
});
