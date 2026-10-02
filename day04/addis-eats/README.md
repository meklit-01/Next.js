# Addis Eats API

## API Endpoints

### GET `/api/dishes`

Returns all dishes.

**Success:**

* `200` — dishes returned successfully

**Error:**

* `500` — failed to load dishes

---

### GET `/api/dishes/[id]`

Returns one dish by its ID.

**Success:**

* `200` — dish found

**Errors:**

* `404` — dish not found
* `500` — failed to load dish

Example:

```text
GET /api/dishes/1
```

---

### POST `/api/orders`

Creates a new order.

**Success:**

* `201` — order created successfully

**Errors:**

* `422` — validation errors
* `400` — invalid request

Example request:

```json
{
  "name": "Meklit",
  "phone": "0912345678",
  "area": "Bole",
  "notes": "Please call when you arrive"
}
```

Validation errors are returned using `fieldErrors`.

Example:

```json
{
  "fieldErrors": {
    "phone": "Phone must be 10 digits and start with 09."
  }
}
```

## Server Actions

### `placeOrder`

The checkout form uses the `placeOrder` Server Action instead of sending the order with `fetch`.

It:

* validates the form
* creates the order
* uses `useActionState`
* displays field errors
* displays a pending state
* revalidates the orders page after a successful order

### `cancelOrder`

The `cancelOrder` Server Action checks:

1. A session exists.
2. The order exists.
3. The order belongs to the current session.

An unauthorized user cannot cancel another user's order by simply calling the action from the browser.

## Environment Variables

Server secrets are stored in `.env.local`.

`.env.local` is ignored by Git using:

```text
.env*
```

Secrets are not exposed through `NEXT_PUBLIC_` environment variables or client-side code.
