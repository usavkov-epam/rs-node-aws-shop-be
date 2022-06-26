import { getAllProducts } from '../controllers/product';

export const handler = async (_event: any, _context: any) => {
  const allProducts = await getAllProducts();

  return allProducts;
};
