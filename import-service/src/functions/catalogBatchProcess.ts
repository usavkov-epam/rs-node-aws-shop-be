import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { Client, ClientConfig } from 'pg';

import { createProducts } from "../utils";

const {
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_USERNAME,
  PG_PASSWORD,
} = process.env;

const options: ClientConfig = {
  host: PG_HOST,
  port: Number(PG_PORT),
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  connectionTimeoutMillis: 5000,
  ssl: {
    rejectUnauthorized: false,
  }
}

export const handler = async (event: any, _context: any) => {
  const { Records } = event;
  const sns = new SNSClient({ region: 'eu-west-1' });
  const db = new Client(options);

  try {
    await db.connect();
    const products = await createProducts(db)(Records.map(({ body }) => JSON.parse(body)));

    console.log('CREATED PRODUCTS FROM QUEUE:\n', JSON.stringify(products, null, 2))

    try {
      await sns.send(
        new PublishCommand({
          Message: `Created new products ${JSON.stringify(products, null, 2)}`,
          TopicArn: process.env.SNS_ARN,
          MessageAttributes: {
            moreThan100Items: {
              DataType: 'String',
              StringValue: products.reduce((sum, { count }) => sum + +count) > 100 ? 'true' : 'false',
            },
          },
        })
      );
    } catch (error) {
      console.log("ERROR SNS: ", error);
    }
  
    return {
      statusCode: 201,
      body: JSON.stringify(products, null, 2),
    };
  } catch (error) {
    console.log('ERROR FROM LAMBDA: ', error);

    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        message: error.message,
      }, null, 2),
    }
  } finally {
    await db.end();
  }
};
