import { handler } from '../../src/functions/getProductsById';
import { event, products } from '../fixtures';

describe('getProductsById', () => {
  it('should return a product by id', async () => {
    const result = await handler(event, {});
    const product = products.find(p => p.id === event.pathParameters.productId) || {};

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({...product}, null, 2),
    });
  });

  it('should return an error if product id is not provided', async () => {
    const result = await handler({}, {});

    expect(result).toEqual({
      statusCode: 404,
      body: JSON.stringify({
        message: 'No id provided',
      }, null, 2),
    });
  });

  it('should return a 404 error if product id is not found', async () => {
    const result = await handler({
      pathParameters: {
        productId: 'not-found',
      },
    }, {});

    expect(result).toEqual({
      statusCode: 404,
      body: JSON.stringify({
        message: 'Product not found',
      }, null, 2),
    });
  });
});
