# Addis Eats — Authentication and Authorization

## Session

The `session` cookie is:

- `httpOnly`
- `secure` in production
- `sameSite: "lax"`
- signed with `SESSION_SECRET`
- limited to seven days

`lib/session.js` is the single session helper used by pages, server actions, and API handlers.

## Protected routes

| Route | Middleware | Server check | What it proves |
|---|---|---|---|
| `/checkout` | Yes | Yes | The visitor has a valid signed session before placing an order. |
| `/orders` | Yes | Yes | The page only reads orders belonging to the signed-in session id. |
| `/order-status` | Yes | Yes | The live status page only reads the signed-in user's orders. |
| `/kitchen` | Yes | Yes + staff role | The request has a valid session and the session role is `staff`. |

Middleware uses a narrow matcher for only these private routes. It does not run on images, CSS, or unrelated public routes.

## Ownership

Every order read is scoped with the session id. Every write checks the session again inside the server action or API handler. A submitted order id cannot be used to cancel another user's order.

## Safe redirect

The login `next` value must be an internal path beginning with `/`. Values beginning with `//`, containing `\`, or otherwise not being an internal path fall back to `/orders`.

## Attack checks

### 1. Server action while signed out

Expected result: the action returns `You must be signed in.`

Stopping layer: `getSession()` inside `placeOrder` and `cancelOrder`.

### 2. Another user's order id

Expected result: cancellation fails with `Order not found or you do not own this order.`

Stopping layer: `getOrderByIdForUser(orderId, session.id)`.

### 3. External `next`

Expected result: the login response redirects to `/orders`, not an external site.

Stopping layer: `safeNext()` in `/api/login`.

## Staff route

The kitchen link/route is not protected only by hiding UI. `/kitchen` checks `session.role === "staff"` on the server and returns Access denied for normal users.
