import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { BUCKET_NAME } from '../constants';
import { validateImport } from '../utils';

export const handler = async (event: any, _context: any) => {
  try {
    const { queryStringParameters } = event;
    const s3 = new S3Client({ region: 'eu-west-1' });

    const errors = await validateImport({ queryStringParameters });

    if (errors) {
      return {
        statusCode: 400,
        body: JSON.stringify(errors),
      };
    }  
    
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `uploaded/${queryStringParameters.name}`,
    });

    const signedUrl = await getSignedUrl(s3, command);

    return {
      statusCode: 200,
      body: signedUrl,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error?.message || 'Generic error',
    }
  }
};
