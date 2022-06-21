import { Products } from '../helpers';

export const handler = async (event: any, _context: any) => {
  const { pathParameters = {} } = event;

  const products = new Products();
  
  try {
    const product = await products.getById(pathParameters.productId);
  
    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 404,
      body: JSON.stringify({
        message: error.message,
      }),
    }
  }
};
