create extension if not exists "uuid-ossp";

create table products (
	id uuid not null default uuid_generate_v4() primary key,
	title text not null,
	description text,
	price integer
);

create table stocks (
	product_id uuid primary key,
  	"count" integer,
    FOREIGN key (product_id) REFERENCES products(id)
);

drop table products;

insert into products (title, description, price) values ('Headphones', 'Over-Ear Headphones', 120);
insert into products (title, description, price) values ('Earbuds', 'HiFi Wireless Earbuds', 145);
insert into products (title, description, price) values ('Gaming Headset', 'Heavy-duty Gaming Headphones ', 210);
insert into products (title, description, price) values ('On-ear Headphones', 'Headphones that sit directly on top of your ears', 160);
insert into products (title, description, price) values ('Monitors', 'Wireless studio earbuds', 320);

insert into stocks (product_id, "count") values ('fbfeffcb-afd0-4009-ae46-f76bd5c82fd3', 60);
insert into stocks (product_id, "count") values ('1c5e5a6e-b21a-4ef0-85f0-923f549e1895', 120);
insert into stocks (product_id, "count") values ('ca53d4d6-b3a9-4211-9afd-b7154d762a1f', 30);
insert into stocks (product_id, "count") values ('dc37f1e4-e882-450d-8307-e59f040034b4', 80);
insert into stocks (product_id, "count") values ('bc891654-f3ae-4a32-85be-02c5e62d7743', 15);


       