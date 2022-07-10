import ImportSchema from '../schemas/SignedUrl';

export default {
  schemas: {
    Import: ImportSchema,
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
