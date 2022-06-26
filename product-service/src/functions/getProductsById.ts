import { getProductById } from '../controllers/product';

export const handler = async (event: any, _context: any) => {
  const { pathParameters = {}, routeKey } = event;

  console.log(`LOGGER path - ${routeKey}`);
  console.log(`LOGGER params - ${JSON.stringify(pathParameters)}`);
  
  try {
    const product = await getProductById(pathParameters.productId);
  
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
