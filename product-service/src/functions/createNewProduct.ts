import { createProduct } from '../controllers/product';

export const handler = async (event: any, _context: any) => {
  const { body } = event;

  try {
    const product = await createProduct(JSON.parse(body));
  
    return {
      statusCode: 201,
      body: JSON.stringify(product),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        message: error.message,
      }),
    }
  }
};
