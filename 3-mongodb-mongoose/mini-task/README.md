# Mini product: product API with MongoDB

## Instructions (15-20 minutes)

Build a simple product API connected to MongoDB with Create and Read operations.

## product 1: Connect to MongoDB

Set up the Mongoose connection using your `.env` file.

## product 2: Create a Product Schema

Define a schema with these fields:

- `title` - String, required
- `description` - String, optional
- `rating` - Number, default: false
- `createdAt` - Date, default: current date

## product 3: Create the Model

Create a `product` model from the schema.

## product 4: Implement CREATE Endpoint

Create `POST /api/products` that:

- Takes `title` and `description` from request body
- Creates a new product in MongoDB
- Returns the created product with status 201

## product 5: Implement READ Endpoint

Create `GET /api/products` that:

- Retrieves all products from MongoDB
- Returns the array of products

## Getting Started

1. Make sure you have a `.env` file with your `MONGO_URI`
2. Complete the starter code in `product-api.js`
3. Run: `npm run product` or `npm run product:dev` (with nodemon)
4. Test with Postman

## Expected Response Format

```json
// POST /api/products (with body: { "title": "My product", "description": "Details" })
{
  "_id": "...",
  "title": "My product",
  "description": "Details",
  "done": false,
  "createdAt": "2024-01-15T10:30:00.000Z"
}

// GET /api/products
[
  {
    "_id": "...",
    "title": "My product",
    "description": "Details",
    "done": false,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

## Test with Postman

### Create a product

```
Method: POST
URL: http://localhost:3000/api/products
Headers: Content-Type: application/json
Body (raw JSON):
{
  "title": "Learn MongoDB",
  "description": "Complete the workshop"
}
```

### Get All products

```
Method: GET
URL: http://localhost:3000/api/products
```

## Bonus Challenges

- Add a `GET /api/products/:id` endpoint to get a single product
- Add validation error handling
- Add a `GET /api/products/pending` endpoint to get only incomplete products
