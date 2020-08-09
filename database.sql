CREATE DATABASE my_db;

CREATE TABLE register(
  register_id SERIAL PRIMARY KEY,
  description VARCHAR(255),
  price DOUBLE PRECISION,
  contact BIGINT[],
  date_col DATE,
  timestamp_col TIMESTAMP,
  timestamptz_col TIMESTAMPTZ,
  data JSON 
  );