import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { mockClient } from 'aws-sdk-client-mock';

import { importEvent } from '../fixtures';
import { BUCKET_NAME } from '../../src/constants';
import { handler } from '../../src/functions/importProductsFile';
import { ERRORS, ValidationErrorCodes } from '../../src/utils';

const s3Mock = mockClient(S3Client);

describe('importProductsFile lambda', () => {
  beforeEach(() => {
    s3Mock.reset();
    s3Mock.on(GetObjectCommand).resolves({})
  });

  it('should return response 200 with signed URL', async () => {
    const response = await handler(importEvent, {});

    expect(response).toEqual({
      statusCode: 200,
      body: expect.stringContaining(`https://${BUCKET_NAME}`),
    })
  })

  it('should return response 400 with validation errors', async () => {
    const response = await handler({}, {});

    expect(response).toEqual({
      statusCode: 400,
      body: JSON.stringify({
        errors: [{
          message: ERRORS.nameParamAbsent,
          code: ValidationErrorCodes.nameParamAbsent,
        }]
      }, null, 2),
    })
  })

  it('should return response 500 with internal error', async () => {
    const response = await handler(null, null);

    expect(response).toEqual({
      statusCode: 500,
      body: expect.stringMatching(/.*/),
    });
  })
});
