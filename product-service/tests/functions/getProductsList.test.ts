import { handler } from '../../src/functions/getProductsList';
import { products } from '../fixtures'

describe('getProductsList', () => {
  it('should return an array of products', async () => {
    const result = await handler({}, {});

    expect(result).toEqual(products);
  });
});
