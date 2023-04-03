CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE apps (
    app_id SERIAL PRIMARY KEY,
    app_name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    developer VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    media VARCHAR(255) NOT NULL,
    isTopSelling BOOLEAN NOT NULL DEFAULT FALSE,
    isTopGrossing BOOLEAN NOT NULL DEFAULT FALSE,
    isTopPaid BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE games (
    game_id SERIAL PRIMARY KEY,
    game_name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    developer VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    media VARCHAR(255) NOT NULL,
    isTopSelling BOOLEAN NOT NULL DEFAULT FALSE,
    isTopGrossing BOOLEAN NOT NULL DEFAULT FALSE,
    isTopPaid BOOLEAN NOT NULL DEFAULT FALSE,
    isPopular BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE movies (
    movie_id SERIAL PRIMARY KEY,
    movie_name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    director VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    media VARCHAR(255) NOT NULL,
    isTopMovie BOOLEAN NOT NULL DEFAULT FALSE,
    isTopSelling BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    book_name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    author VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    media VARCHAR(255) NOT NULL,
    isTopSelling BOOLEAN NOT NULL DEFAULT FALSE,
    isDeal BOOLEAN NOT NULL DEFAULT FALSE,
    isNewReleaseInFiction BOOLEAN NOT NULL DEFAULT FALSE,
    isNewReleaseInNonFiction BOOLEAN NOT NULL DEFAULT FALSE,
    isTopFree BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    app_id INT REFERENCES apps(app_id),
    game_id INT REFERENCES games(game_id),
    movie_id INT REFERENCES movies(movie_id),
    book_id INT REFERENCES books(book_id),
    user_id INT NOT NULL REFERENCES users(user_id),
    rating INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE favorites (
    favorites_id SERIAL PRIMARY KEY,
    app_id INT REFERENCES apps(app_id),
    game_id INT REFERENCES games(game_id),
    movie_id INT REFERENCES movies(movie_id),
    book_id INT REFERENCES books(book_id),
    user_id INT NOT NULL REFERENCES users(user_id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    isStillMarked BOOLEAN NOT NULL DEFAULT TRUE
);

