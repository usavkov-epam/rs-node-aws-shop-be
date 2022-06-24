CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	title text NOT NULL,
	description text,
	price integer
);

CREATE TABLE IF NOT EXISTS stocks (
	product_id uuid,
	count int,
	FOREIGN KEY ("product_id") REFERENCES "products" ("id")
);

INSERT INTO products (title, description, price) VALUES
	('iPhone 13', 'Apple iPhone 13', 999),
	('iPhone 13 Pro', 'Apple iPhone 13 Pro', 1099),
	('iPhone 13 Pro Max', 'Apple iPhone 13 Pro Max', 1299)

INSERT INTO stocks (product_id, count) VALUES
	('80c7a67e-659d-4149-bd5d-23588096636a', 256),
	('7ac701b2-0cfd-4b31-b449-4439ffcb51c2', 128),
	('4108c6df-b9a0-4b97-a5a6-b5263b927982', 64)