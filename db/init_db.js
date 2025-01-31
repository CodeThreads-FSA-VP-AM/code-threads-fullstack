const {
  client,
  // declare your model imports here
  // for example, User
} = require("./");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    try {
      console.log(`Dropping all tables....`);
      await client.query(`
      DROP TABLE IF EXISTS sizes;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS tags;
      DROP TABLE IF EXISTS images;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
      `);
      console.log(`finished dropping tables.`);
    } catch (error) {
      console.error(`Error dropping tables`);
    }

    // build tables in correct order

    try {
      console.log(`Starting to build tables...`);
      await client.query(`

      CREATE TABLE users(
       id SERIAL PRIMARY KEY,
       username VARCHAR(50) UNIQUE NOT NULL,
       email VARCHAR(255) UNIWUE NOT NULL,
       created_at TIMESTAMP NOT NULL DEFAULT NOW(),
       is_admin BOOLEAN DEFAULT false
       );
       
       CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        views INTEGER,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        );
        
        CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        users_id INTEGER REFERENCES users(id),
        product_id INTEGER REFERENCES products(id),
        status VARCHAR(255) NOT NULL,
        purchased_at TIMESTAMP NOT NULL DEFAULT NOW(),
        );
        
        CREATE TABLE images(
          id SERIAL PRIMARY KEY,
          users_id INTEGER REFERENCES users(id),
          product_id INTEGER REFERENCES products(id),
          front_url TEXT NOT NULL,
          back_url TEXT NOT NULL,
          avatar_url TEXT NOT NULL,
      );

      CREATE TABLE tags(
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        name VARCHAR(255) NOT NULL
        );
        
        CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        users_id INTEGER REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        rating INTEGER NOT NULL
        );
        
        CREATE TABLE sizes(
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        small INTEGER, 
        medium INTEGER, 
        large INTEGER, 
        xlarge INTEGER, 
      )
      
      `);
      console.log(`Finished building tables.`);
    } catch (error) {
      console.error(`Error building tables.`);
    }
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
