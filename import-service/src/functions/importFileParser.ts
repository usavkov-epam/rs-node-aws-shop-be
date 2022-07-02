import {
  S3Client,
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import * as parseCsv from 'csv-parser';

import { BUCKET_NAME } from '../constants';
import { validateExtension } from '../utils';

export const handler = async (event: any, _context: any) => {
  try {
    const { Records } = event;
    const s3 = new S3Client({ region: 'eu-west-1' });

    for (const record of Records) {
      const isNotCsv = validateExtension(record.s3.object.key);

      if (!isNotCsv) {
        const object = await s3.send(new GetObjectCommand({
          Bucket: BUCKET_NAME,
          Key: record.s3.object.key,
        }))

        const buffer = [];

        object.Body
          .pipe(parseCsv())
          .on('data', (data) => buffer.push(data))
          .on('end', async () => {
            await s3.send(new CopyObjectCommand({
              Bucket: BUCKET_NAME,
              CopySource: `${BUCKET_NAME}/${record.s3.object.key}`,
              Key: record.s3.object.key.replace('uploaded', 'parsed'),
            }));
      
            await s3.send(new DeleteObjectCommand({
              Bucket: BUCKET_NAME,
              Key: record.s3.object.key,
            }));

            console.log('PARSED OBJECT: ', JSON.stringify(buffer, null, 2));
          })
      }
    }
    
    return {
      statusCode: 202,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error?.message || 'Generic error',
    }
  }
};