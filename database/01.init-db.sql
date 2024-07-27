-- CREATE TABLE USERS
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    uname TEXT NOT NULL,
    passwd TEXT NOT NULL
);

-- CREATE TABLE POSTS

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    contents TEXT NOT NULL,
    photoUrl TEXT,
    CONSTRAINT author
        FOREIGN KEY (id)
            REFERENCES users(id)
            ON DELETE CASCADE
);