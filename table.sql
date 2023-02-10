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
    category_name varchar(255) NOT NULL
);

insert into prod_category (category_name) VALUES ("cold drink");
insert into prod_category (category_name) VALUES ("meal");
insert into prod_category (category_name) VALUES ("breakfast");
insert into prod_category (category_name) VALUES ("snacks");
insert into prod_category (category_name) VALUES ("starter");


create table products(
    product_id int primary key AUTO_INCREMENT,
    product_name varchar(255) NOT NULL,
    product_category int NOT NULL,
    in_stock bool NOT NULL,
    product_description varchar(255) DEFAULT 'tasty',
    price float NOT NULL,
    CONSTRAINT fk_prod_belongs_to_catog FOREIGN KEY (product_category) REFERENCES prod_category(category_id) 
);

insert into products (product_name,product_category,in_stock,product_description,price) VALUES ("orange juice",1,true,"ice chilled orange juice",50.00);
insert into products (product_name,product_category,in_stock,product_description,price) VALUES ("papaya juice",1,true,"ice chilled papaya juice",50.00);
insert into products (product_name,product_category,in_stock,product_description,price) VALUES ("golgappe",4,true,"mint flavoured",30.00);
insert into products (product_name,product_category,in_stock,product_description,price) VALUES ("dosa",3,true,"masala dosa",60.00);
insert into products (product_name,product_category,in_stock,product_description,price) VALUES ("thali",2,false,"thali with mattar panir",100.00);



SELECT products.product_id, products.product_name, prod_category.category_name, products.product_description, products.price, products.in_stock
FROM products
INNER JOIN prod_category ON products.product_category = prod_category.category_id;
