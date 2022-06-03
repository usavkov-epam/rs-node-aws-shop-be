export default {
  type: 'object',
  properties: {
    id: {
      type: 'uuid',
      example: 'd8f8f8f8-f8f8-f8f8-f8f8-f8f8f8f8f8f8',
    },
    title: {
      type: 'string',
      example: 'Product title',
    },
    price: {
      type: 'number',
      example: '100',
    },
    description: {
      type: 'string',
      example: 'Product description',
    },
    count: {
      type: 'number',
      example: '10',
    },
  },
};
