-- drop ayushcafe DATABASE if it not exists:
DROP DATABASE if exists ayushcafe;
-- CREATE ayushcafe DATABASE:
CREATE DATABASE ayushcafe;
-- use ayushcafe DATABASE:
USE ayushcafe;
-- CREATE users table:
CREATE table if not exists users(
   user_id int not null auto_increment,
   user_name VARCHAR(255) not NULL,
   user_email VARCHAR(255) not NULL unique,
   mob_no VARCHAR(50) not NULL,
   constraint pk_user_id primary key(user_id)
);
-- INSERT data into users:
insert into users(user_name, user_email, mob_no)
values (
      "Ayush Raj",
      "ayushjnv25@gmail.com",
      "1234567890"
   );
-- CREATE user_auth table:
CREATE TABLE IF NOT EXISTS user_auth(
   auth_id int not NULL auto_increment,
   -- user_id int not NULL,
   user_passw varchar(255) not null,
   email_otp VARCHAR(10) default null,
   otp_dt_time TIMESTAMP default CURRENT_TIMESTAMP on UPDATE CURRENT_TIMESTAMP,
   authorized bool null,
   verified bool null,
   constraint pk_auth_id primary key(auth_id),
   -- CONSTRAINT fk_auth_id_of_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
   CONSTRAINT fk_auth_id_of_user_id FOREIGN KEY (auth_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- INSERT data into user_auth:
insert into user_auth(user_id, user_passw, authorized, verified)
values (1, "12345", true, true);
-- CREATE customer table:
create table if not exists customer(
   cust_id int not null auto_increment,
   cust_name varchar(255) not null,
   email varchar(255) not null,
   mob_no varchar(255) not null,
   constraint pk_cust_id primary key (cust_id)
);
-- INSERT data into customer:
insert into customer(cust_name, email, mob_no)
values (
      "Anurag Upadhyay",
      "anurag@gmail.com",
      "7894561230"
   );
-- CREATE prod_category table:
create table if not exists prod_category(
   categ_id int not null auto_increment,
   categ_name varchar(255) not null unique,
   constraint pk_categ_id primary key (categ_id)
);
-- INSERT data into prod_category:
insert into prod_category (categ_name)
values("cold drink");
-- CREATE products table:
create table if not exists products(
   prod_id int not null auto_increment,
   prod_name varchar(255) not null unique,
   prod_categ_id int not null,
   in_stock bool not null,
   prod_desc varchar(255) default 'best selling',
   unit_price float not null,
   constraint pk_prod_id primary key (prod_id),
   CONSTRAINT fk_prod_categ_id FOREIGN KEY (prod_categ_id) REFERENCES prod_category(categ_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- INSERT data into products:
insert into products(
      prod_name,
      prod_categ_id,
      in_stock,
      prod_desc,
      unit_price
   )
values("Mazza", 1, true, "Mazza: 500 ml", 45);
-- CREATE cust_order table:
CREATE TABLE IF NOT EXISTS cust_order(
   ord_id INT NOT NULL auto_increment,
   ord_date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   cust_id INT NOT NULL,
   bill_amount int not null,
   ord_bill varchar(255) not null unique,
   ord_processed_by int not null,
   constraint pk_ord_id primary key (ord_id),
   CONSTRAINT fk_ordered_by_cust FOREIGN KEY (cust_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- INSERT data into cust_order:
insert into cust_order(cust_id, bill_amount, ord_bill, ord_processed_by)
values (1, 100, "C:/Users/ayush/Downloads/bill_1.pdf", 1);
-- CREATE ord_prod_relation_table table(for many to many relation between products and cust_order):
CREATE TABLE IF NOT EXISTS ord_prod_relation_table(
   ord_id int not NULL,
   prod_id int not NULL,
   quantity int not null,
   unit_price int not null,
   constraint pk_ord_id_prod_id primary key(ord_id, prod_id),
   constraint fk_prod_is_in_ord FOREIGN key (ord_id) REFERENCES cust_order(ord_id) ON DELETE CASCADE ON UPDATE CASCADE,
   constraint fk_ord_has_items FOREIGN key (prod_id) REFERENCES products(prod_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- INSERT data into ord_prod_relation_table:
insert into ord_prod_relation_table (ord_id, prod_id, quantity, unit_price)
values (1, 1, 5, 100);
-- show values from the tables:
SELECT *
from cust_order;
SELECT *
from customer;
SELECT *
from ord_prod_relation_table;
SELECT *
from prod_category;
SELECT *
from products;
SELECT *
from user_auth;
SELECT *
from users;
-- INSERT data into user_auth(the below values inserted has admin privilages):
insert into user_auth(user_passw, authorized, verified)
values ("12345", true, true);