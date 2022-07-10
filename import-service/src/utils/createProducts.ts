export const createProducts = (db) => async (data) => {
  console.log('START CREATING PRODUCTS: ', data);

  const products = await Promise.all(data.map(async ({
    title,
    description,
    price,
    count,
  }) => {
    if (!title || !description || !price) throw { statusCode: 400, message: 'Missing required fields' };    

    try {
      await db.query('BEGIN');

      const { rows: products } = await db.query(`
        INSERT INTO products (title, description, price)
        VALUES ('${title}', '${description}', ${Number(price)})
        RETURNING *
      `)
      
      await db.query(`
        INSERT INTO stocks (product_id, count)
        VALUES ('${products[0].id}', ${Number(count)})
      `)

      await db.query('COMMIT');
      
      return { ...products[0], count: Number(count) };
    } catch (error) {
      await db.query('ROLLBACK');
      throw { statusCode: 500, message: error?.message || 'Transaction failed' }
    }
  }));

  console.log('FINISH CREATING PRODUCTS: ', products);

  return products;
};
