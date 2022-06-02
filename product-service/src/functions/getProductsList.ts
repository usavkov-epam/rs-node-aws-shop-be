import { Products } from '../helpers';

export const handler = async (_event: any, _context: any) => {
  const products = new Products();
  const allProducts = await products.getAll();

  return allProducts;
};
