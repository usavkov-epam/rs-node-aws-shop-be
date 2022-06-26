import { getClient } from '../helpers';

export const getAll = async () => {
  const client = getClient();
  await client.connect();

  return client.query(`
    SELECT id, title, description, price, count
    FROM products p
    LEFT JOIN stocks s 
    ON p.id = s.product_id 
  `)
    .then(({ rows }) => rows)
    .catch((error) => { throw new Error(`Fail on execution query: ${error?.message}`) })
    .finally(() => client.end());
}

export const getBy = async (
  selector: string,
  value: string,
  { qualifier = '=' } = {},
) => {
  const client = getClient();
  await client.connect();

  try {
    const { rows } = await client.query(`
      SELECT id, title, description, price, count
      FROM products p
      LEFT JOIN stocks s 
      ON p.id = s.product_id
      WHERE ${selector} ${qualifier} '${value}'
    `)

    return rows[0];
  } catch (error) {
    throw new Error(`Fail on execution query: ${error?.message}`)
  } finally {
    await client.end();
  }
}

export const create = async ({
  title,
  description,
  price,
  count = 0,
}) => {
  const client = getClient();
  await client.connect();

  try {
    await client.query('BEGIN');

    const { rows: products } = await client.query(`
      INSERT INTO products (title, description, price)
      VALUES ('${title}', '${description}', ${price})
      RETURNING *
    `)
    
    await client.query(`
      INSERT INTO stocks (product_id, count)
      VALUES ('${products[0].id}', ${count})
    `)

    await client.query('COMMIT');
    
    return { ...products[0], count };
  } catch (error) {
    await client.query('ROLLBACK');
    throw { statusCode: 500, message: error?.message || 'Transaction failed' }
  } finally {
    await client.end();
  }
}
