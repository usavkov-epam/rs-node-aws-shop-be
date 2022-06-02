import { Products } from '../helpers';

export const handler = async (event: any, _context: any) => {
  const { pathParameters = {} } = event;

  const products = new Products();
  const product = await products.getById(pathParameters.productId);
  
  return product;
};
