import {
  create,
  getAll,
  getBy,
} from '../models/product';

export const getAllProducts = async () => {
  return getAll();
};

export const getProductById = async (id: string) => {
  if (!id) throw new Error('ID is required.');

  return getBy('id', id);
};

export const createProduct = async ({
  title,
  description,
  price,
  count,
}) => {
  if (!title || !description || !price) throw { statusCode: 400, message: 'Missing required fields' };

  return create({ title, description, price, count });
};
