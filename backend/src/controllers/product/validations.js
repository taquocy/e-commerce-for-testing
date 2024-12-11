import Joi from 'joi';

const ProductSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(3),
  price: Joi.string().required(),
  photos: Joi.string(),
  color: Joi.array().items(Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/i)).required(),
});

export default ProductSchema;
