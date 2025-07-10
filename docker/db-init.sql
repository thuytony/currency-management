-- Create database
CREATE DATABASE currency_db;

-- Create user  
CREATE USER currency_user WITH ENCRYPTED PASSWORD 'currency_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE currency_db TO currency_user;

-- Connect to currency_db
\c currency_db;

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO currency_user; 