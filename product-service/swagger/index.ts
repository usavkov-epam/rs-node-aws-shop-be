import components from './components';

export default {
  tags: [
    {
      name: 'Product service',
      description: 'Operations about products',
    }
  ],

  paths: {
    '/products': {
      get: {
        summary: 'Get all products',
        description: 'Get all products',
        operationId: 'getProductsList',
        tags: ['Product service'],
        responses: {
          '200': {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: components.schemas.ProductList,
              },
            },
          },
          '400': {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: components.schemas.BadRequest,
              },
            },
          },
        },
      },
    },
    '/products/{productId}': {
      get: {
        summary: 'Get product by id',
        description: 'Get product by id',
        operationId: 'getProductsById',
        tags: ['Product service'],
        responses: {
          '200': {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: components.schemas.Product,
              }
            }
          },
          '404': {
            description: 'Not found',
            content: {
              'application/json': {
                schema: components.schemas.NotFoundError,
              },
            },
          },
        },
      },
    },
  },
}
