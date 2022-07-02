import { getAllProducts } from '../controllers/product';

export const handler = async (event: any, _context: any) => {
  const { routeKey } = event;

  console.log(`LOGGER path - ${routeKey}`);
  

  const allProducts = await getAllProducts();

  return allProducts;
};
