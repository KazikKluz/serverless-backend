'use strict';

const { Pool } = require('pg');

const { validateProduct } = require('./productsValidator.js');
const { responseHelper } = require('./responseHelper');

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;
const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false, //to avoid warning
  },
  connectionTimeoutMillis: 5000, //time for termination of the database query
};

//cached variable
let pool;

module.exports.getProductsList = async () => {
  console.log(`getProductsList lambda called`);
  //check if pool already exist. create new one if nor
  if (!pool) {
    pool = new Pool(dbOptions);
  }

  let client;

  try {
    //get client from pool
    client = await pool.connect();
  } catch (err) {
    console.log(err);
    return responseHelper(500, 'Error during connecting to database');
  }

  try {
    const { rows: products } = await client.query(`
        SELECT p.id, p.title, p.description, p.price, s.count, i.imageUrl
        FROM products AS p
        INNER JOIN 
        stocks AS s 
        ON p.id = s.product_id
       	INNER JOIN
       	images AS i
       	ON p.id = i.product_id 
    `);
    return responseHelper(200, products);
  } catch (err) {
    return responseHelper(500, 'Error during database query execution');
  } finally {
    client.release();
  }
};

module.exports.getProductsById = async (event) => {
  const id = event.pathParameters.productId;

  console.log(`getProductsById lambda called with params: ${id}`);

  //check if pool already exist. create new one if nor
  if (!pool) {
    pool = new Pool(dbOptions);
  }

  let client;

  try {
    //get client from pool
    client = await pool.connect();
  } catch (err) {
    console.log(err);
    return responseHelper(500, 'Error during connecting to database');
  }

  try {
    const { rows: products } = await client.query(
      `
        SELECT p.id, p.title, p.description, p.price, s.count
        FROM products AS p
        INNER JOIN 
        stocks AS s
        ON p.id = s.product_id
        INNER JOIN
       	images AS i
       	ON p.id = i.product_id 
        WHERE p.id = $1;
    `,
      [id]
    );
    return responseHelper(200, products);
  } catch (err) {
    console.log(err);
    return responseHelper(500, 'Error during database query execution');
  } finally {
    client.release();
  }
};

module.exports.postProducts = async (event) => {
  console.log(`postProducts lambda called with arguments: ${event.body}`);

  const newProduct = JSON.parse(event.body);

  const validatedProduct = validateProduct(newProduct);

  if (validatedProduct) {
    //check if pool already exist. create new one if nor
    if (!pool) {
      pool = new Pool(dbOptions);
    }

    let client;

    try {
      //get client from pool
      client = await pool.connect();
    } catch (err) {
      console.log(err);
      return responseHelper(500, 'Error during database query execution');
    }

    try {
      await client.query('BEGIN');

      const newProduct = (
        await client.query(
          `
      INSERT INTO products (title, description, price)
      VALUES($1, $2, $3) RETURNING *
    `,
          [
            validatedProduct.title,
            validatedProduct.description,
            validatedProduct.price,
          ]
        )
      ).rows[0];

      await client.query(
        `
          INSERT INTO stocks(product_id, count)
          VALUES($1, $2)
      `,
        [newProduct.id, validatedProduct.count]
      );

      await client.query(
        `
          INSERT INTO images(product_id, imageurl)
          VALUES($1, $2)
      `,
        [newProduct.id, validatedProduct.imageurl]
      );

      await client.query('COMMIT');
      return responseHelper(200, 'OK');
    } catch (error) {
      await client.query('ROLLBACK');
      return responseHelper(500, 'error during database query execution');
    } finally {
      client.release();
    }
  } else {
    return responseHelper(400, 'product data is invalid');
  }
};
