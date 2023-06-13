-- Drop ayushcafe database if it exists
DROP DATABASE IF EXISTS ayushcafe;

-- Create ayushcafe database
CREATE DATABASE ayushcafe;

-- Use ayushcafe database
USE ayushcafe;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
   user_id INT NOT NULL AUTO_INCREMENT,
   user_name VARCHAR(255) NOT NULL,
   user_email VARCHAR(255) NOT NULL UNIQUE,
   CONSTRAINT pk_user_id PRIMARY KEY (user_id)
);

-- Inser into users table
INSERT INTO users (user_name, user_email)
VALUES ("Ayush Raj", "ayush@gmail.com");


-- Create user_auth table
CREATE TABLE IF NOT EXISTS user_auth (
   auth_id INT NOT NULL AUTO_INCREMENT,
   user_id INT NOT NULL UNIQUE,
   user_passw VARCHAR(255) NOT NULL,
   email_otp VARCHAR(10) DEFAULT NULL,
   otp_dt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   authorized BOOL DEFAULT 0,
   verified BOOL DEFAULT 0,
   CONSTRAINT pk_auth_id PRIMARY KEY (auth_id),
   CONSTRAINT fk_auth_id_of_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert data into user_auth
INSERT INTO user_auth (user_id, user_passw, authorized, verified)
VALUES (1, '12345', TRUE, TRUE);

-- Create customer table
CREATE TABLE IF NOT EXISTS customer (
   cust_id INT NOT NULL AUTO_INCREMENT,
   cust_name VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL,
   mob_no VARCHAR(255) NOT NULL,
   CONSTRAINT pk_cust_id PRIMARY KEY (cust_id)
);

-- Create prod_category table
CREATE TABLE IF NOT EXISTS prod_category (
   categ_id INT NOT NULL AUTO_INCREMENT,
   categ_name VARCHAR(255) NOT NULL UNIQUE,
   CONSTRAINT pk_categ_id PRIMARY KEY (categ_id)
);

-- Insert data into prod_category
INSERT INTO prod_category (categ_name)
VALUES
   ('COLD DRINKS'),
   ('LASSI'),
   ('ICE-CREAMS'),
   ('BEVERAGES'),
   ('NOODLES'),
   ('BURGER'),
   ('INDIAN BREAD'),
   ('RICE'),
   ('SALAD'),
   ('MILK SHAKES'),
   ('EGG'),
   ('ROLLS'),
   ('SANDWICHES'),
   ('SOUP'),
   ('PAV SPECIAL'),
   ('JUICES'),
   ('BIRYANI');

-- Create products table
CREATE TABLE IF NOT EXISTS products (
   prod_id INT NOT NULL AUTO_INCREMENT,
   prod_name VARCHAR(255) NOT NULL UNIQUE,
   prod_categ_id INT NOT NULL,
   in_stock BOOL NOT NULL,
   prod_desc VARCHAR(255) DEFAULT 'best selling',
   unit_price FLOAT NOT NULL,
   CONSTRAINT pk_prod_id PRIMARY KEY (prod_id),
   CONSTRAINT fk_prod_categ_id FOREIGN KEY (prod_categ_id) REFERENCES prod_category(categ_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert data into products
INSERT INTO products (prod_name, prod_categ_id, in_stock, prod_desc, unit_price)
VALUES ('Mazza', 1, TRUE, 'Mazza: 500 ml', 45);

-- Create cust_order table
CREATE TABLE IF NOT EXISTS cust_order (
   ord_id INT NOT NULL AUTO_INCREMENT,
   ord_date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   cust_id INT NOT NULL,
   bill_amount INT DEFAULT NULL,
   ord_bill VARCHAR(255) DEFAULT NULL,
   ord_processed_by INT NOT NULL,
   CONSTRAINT pk_ord_id PRIMARY KEY (ord_id),
   CONSTRAINT fk_ordered_by_cust FOREIGN KEY (cust_id) REFERENCES customer(cust_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create ord_prod_relation_table (for many-to-many relation between products and cust_order)
CREATE TABLE IF NOT EXISTS ord_prod_relation_table (
   ord_id INT NOT NULL,
   prod_id INT NOT NULL,
   quantity INT NOT NULL,
   unit_price INT NOT NULL,
   CONSTRAINT pk_ord_id_prod_id PRIMARY KEY (ord_id, prod_id),
   CONSTRAINT fk_prod_is_in_ord FOREIGN KEY (ord_id) REFERENCES cust_order(ord_id) ON DELETE CASCADE ON UPDATE CASCADE,
   CONSTRAINT fk_ord_has_items FOREIGN KEY (prod_id) REFERENCES products(prod_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert data into ord_prod_relation_table
-- INSERT INTO ord_prod_relation_table (ord_id, prod_id, quantity, unit_price)
-- VALUES (1, 1, 5, 100);

-- Create a view to easily retrieve information to generate bills
CREATE OR REPLACE VIEW billing_info AS
SELECT ord_id, prod_id AS product_id,
   (
      SELECT prod_name
      FROM products
      WHERE prod_id = product_id
   ) AS prod_name,
   quantity, unit_price, (unit_price * quantity) AS total
FROM ord_prod_relation_table;

-- Show values from the tables
SELECT * FROM cust_order;
SELECT * FROM customer;
SELECT * FROM ord_prod_relation_table;
SELECT * FROM prod_category;
SELECT * FROM products;
SELECT * FROM user_auth;
SELECT * FROM users;


CREATE OR REPLACE VIEW billing_info AS
SELECT ord_id, prod_id AS product_id,
   (
      SELECT prod_name
      FROM products
      WHERE prod_id = ord_prod_relation_table.prod_id
   ) AS prod_name,
   quantity, unit_price, (unit_price * quantity) AS total
FROM ord_prod_relation_table;
