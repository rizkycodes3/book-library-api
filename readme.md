# Book Library API

A simple REST API built with **Node.js** and **Express** for managing a book collection. It stores book records in a local `books.json` file and supports listing, adding, viewing, updating, and deleting books.

## Features

- Retrieve all books or a book by ID.
- Add new books.
- Update existing book details.
- Delete books.
- Store book data in a local JSON file.

## Requirements

- [Node.js](https://nodejs.org/)
- npm
- An existing `books.json` file containing a JSON array of books.

## Getting Started

Install Express:

```bash
npm install express
```

Start the server:

```bash
node server.js
```

The API runs on port `3000` by default.

## API Endpoints

| Method | Endpoint     | Description                |
| ------ | ------------ | -------------------------- |
| GET    | `/`          | Returns a welcome message. |
| GET    | `/books`     | Retrieves all books.       |
| POST   | `/books`     | Adds a new book.           |
| GET    | `/books/:id` | Retrieves a book by ID.    |
| PATCH  | `/books/:id` | Updates an existing book.  |
| DELETE | `/books/:id` | Deletes a book.            |

## Book Data

Each book can contain the following fields:

- `id` — unique book identifier.
- `title` — book title.
- `author` — author name.
- `year` — publication year.
- `genre` — book genre.
- `price` — book price.
- `in_stock` — availability status.

The `title` and `author` fields are required when adding a new book.

## Purpose

This project demonstrates the fundamentals of building a REST API with Express, handling HTTP methods, validating request data, and implementing file-based JSON data persistence.
