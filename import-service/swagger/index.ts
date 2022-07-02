import components from './components';

export default {
  tags: [
    {
      name: 'Import service',
      description: 'Operations about import',
    }
  ],
  paths: {
    '/import': {
      get: {
        summary: 'Import CSV file',
        description: 'Import CSV file from UI and get signed URL to put objects.',
        parameters: [
          {
            in: 'query',
            name: 'name',
            description: 'Name of importing file.',
            type: 'string',
            required: true,
          }
        ],
        operationId: 'importCSV',
        tags: ['Import service'],
        responses: {
          '200': {
            description: 'Successful operation',
            content: {
              'text/plain': {
                schema: components.schemas.Import,
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
          uri: "arn:aws:apigateway:eu-west-1:lambda:path/2015-03-31/functions/arn:aws:lambda:eu-west-1:626677577371:function:import-service-dev-importProductsFile/invocations",
          connectionType: "INTERNET",
          timeoutInMillis : 6500
        }
      },
    },
  },
}
