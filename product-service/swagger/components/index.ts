import ProductSchema from '../schemas/Product';

export default {
  schemas: {
    Product: ProductSchema,
    ProductList: {
      type: 'array',
      items: ProductSchema,
    },
    BadRequest: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Bad request',
        },
      }
    },
    NotFoundError: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Product not found',
        },
      },
    },
    ServerError: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Server error',
        },
      }
    },
  },
};
