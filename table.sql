create database cafedatabase;

use cafedatabase;

create table users(
    id int primary key AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    contactNumber varchar(20),
    email varchar(50) NOT NULL,
    password varchar(255) NOT NULL,
    status varchar(20),
    role varchar(20),
    UNIQUE (email)
);

insert into users (name,contactNumber,email,password,status,role) VALUES('Ayush Raj','1234567890','ayushjnv25@gmail.com','admin','true','admin');

create table prod_category(
    category_id int primary key AUTO_INCREMENT,
    category_name varchar(255) NOT NULL UNIQUE
);

insert into prod_category (category_name) VALUES ("cold drink");
insert into prod_category (category_name) VALUES ("meal");
insert into prod_category (category_name) VALUES ("breakfast");
insert into prod_category (category_name) VALUES ("snacks");
insert into prod_category (category_name) VALUES ("starter");
insert into prod_category (category_name) VALUES ("sweets");


create table products(
    product_id int primary key AUTO_INCREMENT,
    product_name varchar(255) UNIQUE NOT NULL,
    product_category int NOT NULL,
    in_stock bool NOT NULL,
    product_description varchar(255) DEFAULT 'tasty',
    price float NOT NULL,
    CONSTRAINT fk_prod_belongs_to_catog FOREIGN KEY (product_category) REFERENCES prod_category(category_id) 
);

insert into products (product_name,product_category,in_stock,product_description,price) VALUES ("ORANGE JUICE",1,true,"ICE CHILLED ORANGE JUICE",50.00);
insert into products (product_name,product_category,in_stock,product_description,price) VALUES ("PAPAYA JUICE",1,true,"ICE CHILLED PAPAYA JUICE",50.00);
insert into products (product_name,product_category,in_stock,product_description,price) VALUES ("GOLGAPPE",4,true,"MINT FLAVOURED",30.00);
insert into products (product_name,product_category,in_stock,product_description,price) VALUES ("DOSA",3,true,"MASALA DOSA",60.00);
insert into products (product_name,product_category,in_stock,product_description,price) VALUES ("THALI",2,false,"THALI WITH MATTAR PANIR",100.00);


-- getting products for manage product table=======================
SELECT products.product_id, products.product_name, prod_category.category_name,prod_category.category_id, products.product_description, products.price, products.in_stock
FROM products
INNER JOIN prod_category ON products.product_category = prod_category.category_id;



update products
set in_stock = false
where product_id = 3;


-- Deleting product from manage product:==================================
delete from products where product_id = 5;

-- Updating/edit product++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 update products set product_name = "masala dosa",product_description = "aaaa",price = 100,product_category = (select category_id from prod_category where category_name = "breakfast") where product_id = 54;

-- adding product++++++++++++++++++++++++++++++++++++++++++++++++++++++++

insert into products (product_name,product_category,in_stock,product_description,price) VALUES ("BANANA",(select category_id from prod_category where category_name = "FRUIT"),true,"BEST BANANA",50);