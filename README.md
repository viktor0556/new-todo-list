![image](https://github.com/viktor0556/New-todo-list/assets/134110891/45dccc2e-c8dd-419f-ace2-e5d1ab57ab1a)
![image](https://github.com/viktor0556/New-todo-list/assets/134110891/f8dc0573-2010-41b2-bd69-253c6151de43)
![image](https://github.com/viktor0556/New-todo-list/assets/134110891/0950b8c6-abd9-4edc-824c-f4c6a9eb7404)
![image](https://github.com/viktor0556/New-todo-list/assets/134110891/60a41240-c5b2-4d59-ab05-7016444d46ae)
![image](https://github.com/viktor0556/New-todo-list/assets/134110891/24ce42ac-6c54-41c8-a957-c441cf1a0dd9)

## Built with

- [React](https://react.dev/)
- [Node](https://nodejs.org/en) (v22.3.0)

To get a local copy of the code, clone it using git:

```
git clone https://github.com/viktor0556/New-todo-list.git
```

Install dependencies:

```
npm install
```

**Database setup:** The application uses PostgreSQL for database management. Make sure you have PostgreSQL installed on your system and create a database for the project.

## PostgreSQL initialization and database creation

1. Download: https://www.postgresql.org/download/
2. Create a database: Open a PostgreSQL service such as pgAdmin or psql. Log in with the appropriate user and then create a new database for the project.
3. Create tables: After you have created the database, create tables to store the necessary data. The following example shows how to create a simple question table:
```
psql -U postgres

CREATE DATABASE todoapp;

\c todoapp

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false
  ALTER TABLE todos ADD COLUMN selectedTime TIME;
);

```

## Create users table with id username and password
```
postgres=# \c yourdatabase
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```
# These permissions must be granted IF NECESSARY:
```
postgres=# \c yourdatabase
GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO your_pg_username;
GRANT ALL PRIVILEGES ON TABLE users TO your_pg_username;
```

## Creating a connection between tasks and users:
```
postgres=# \c yourdatabase
ALTER TABLE todos ADD COLUMN user_id INTEGER;
ALTER TABLE todos ADD CONSTRAINT fk_user
  FOREIGN KEY (user_id)
  REFERENCES users (id);
```

## Creating difficulty for tasks:

```
postgres=# \c yourdatabase
ALTER TABLE todos ADD COLUMN priority VARCHAR(10) DEFAULT 'medium';
```

## Creating Categories:
```
postgres=# \c yourdatabase
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

```
## Todo table modification:
```
postgres=# \c yourdatabase
ALTER TABLE todos ADD COLUMN category_id INTEGER REFERENCES categories(id);
```


# If permission denied for table categories ({"error":"Internal Server Error"}):

```
postgres=# \c yourdatabase
todoapp=# GRANT SELECT, INSERT, UPDATE, DELETE ON categories TO youruser;
```

4. Setting environment variables: After you have created the database and tables, don't forget to set the project environment variables so that the application can connect to the database. For example:
```
# .env file
PG_USER=username
PG_HOST=hostname
PG_DATABASE=database_name
PG_PASSWORD=passowrd
PG_PORT=port
```
These variables are usually stored in the .env file and must be set in the appropriate location to use them in the project.

Now, you can start a local web server by running:

# Start the client-side application

```
cd client/ npm start
```

# Start the server-side application
```
nodemon src/server.ts
If you want to restart the server but do not want to exit the server, write "rs" in the nodemon terminal
```

And then open http://localhost:3000/ to view it in the browser.
