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
          '500': {
            description: 'Server error',
            content: {
              'application/json': {
                schema: components.schemas.ServerError,
              },
            },
          },
        },
        "x-amazon-apigateway-integration" : {
          payloadFormatVersion: "2.0",
          type: "aws_proxy",
          httpMethod: "POST",
          uri: "arn:aws:apigateway:eu-west-1:lambda:path/2015-03-31/functions/arn:aws:lambda:eu-west-1:626677577371:function:product-service-dev-getProductsList/invocations",
          connectionType: "INTERNET",
          timeoutInMillis : 6500
        }
      },
      post: {
        summary: 'Create new product',
        description: 'Create new product',
        operationId: 'createProduct',
        tags: ['Product service'],
        responses: {
          '201': {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: components.schemas.Product,
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
          '500': {
            description: 'Server error',
            content: {
              'application/json': {
                schema: components.schemas.ServerError,
              },
            },
          },
        },
        "x-amazon-apigateway-integration" : {
          payloadFormatVersion: "2.0",
          type: "aws_proxy",
          httpMethod: "POST",
          uri: "arn:aws:apigateway:eu-west-1:lambda:path/2015-03-31/functions/arn:aws:lambda:eu-west-1:626677577371:function:product-service-dev-createProduct/invocations",
          connectionType: "INTERNET",
          timeoutInMillis : 6500
        }
      },
    },
    '/products/{productId}': {
      get: {
        summary: 'Get product by id',
        description: 'Get product by id',
        operationId: 'getProductsById',
        parameters: [
          {
            in: 'path',
            name: 'productId',
            description: 'UUID of the product.',
            type: 'string',
            required: true,
          }
        ],
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
          '500': {
            description: 'Server error',
            content: {
              'application/json': {
                schema: components.schemas.ServerError,
              },
            },
          },
        },
        "x-amazon-apigateway-integration" : {
          payloadFormatVersion: "2.0",
          type: "aws_proxy",
          httpMethod: "POST",
          uri: "arn:aws:apigateway:eu-west-1:lambda:path/2015-03-31/functions/arn:aws:lambda:eu-west-1:626677577371:function:product-service-dev-getProductsById/invocations",
          connectionType: "INTERNET",
          timeoutInMillis : 6500
        }
      },
    },
  },
}
