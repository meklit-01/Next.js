# Addis Eats — Module 3, Day 48 Accessibility Lab

A small standalone Next.js App Router project demonstrating keyboard access, visible focus, Escape-to-close behavior, 44px controls, pending submit states, a demo idempotency check, production-build checks, and Vercel deployment steps.

## Requirements

- Node.js 20.9 or later
- npm

## Run locally

```powershell
npm install
npm run dev
```

Open http://localhost:3000.

## Pages

- `/` — overview
- `/menu` — semantic menu links
- `/checkout` — form, disabled pending button, server validation and idempotency demonstration
- `/orders` — order page placeholder and API link
- `/api/orders` — GET order JSON; POST creates a demo order
- `/preflight` — keyboard demo and deployment checklist

## Build and start production mode

```powershell
npm run build
npm run start
```

Review the route table printed by `next build`. Confirm the expected pages and API route appear.

## Keyboard test (mouse out of reach)

1. Press Tab and Shift+Tab to move through controls.
2. Confirm the focus ring is visible.
3. Press Enter to open the keyboard demo dialog.
4. Press Escape to close it.
5. Use Tab, Enter, Space, and arrow keys to complete checkout.
6. Check that controls have at least 44px target height/width and no important information appears only on hover.

## Duplicate submission exercise

The checkout UI disables its submit button while the request is pending. The API also checks an idempotency key and returns the same order if that same key is received again. The sample client creates a new key per submission; the disabled/pending UI prevents a normal double-click from creating two submissions.

**Production note:** this app's API store is in-memory and is only for practice. In production, persist orders in a database and enforce a unique idempotency key with a database constraint/transaction. In-memory maps are not safe across serverless instances or restarts.

## Vercel deployment

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project**, then import the repository.
3. Keep the default Next.js framework settings unless your repo uses a different root directory.
4. Under **Settings → Environment Variables**, add every variable required by your real app. Select the right targets: Production, Preview, and Development. This demo does not require any environment variables.
5. Deploy, then redeploy after changing environment variables.

## Post-deployment private-window test

Open the deployed URL in a private/incognito window and test `/`, `/menu`, `/checkout`, `/orders`, and `/preflight`. Complete the keyboard pass without a mouse; submit a valid order and an invalid form; check the pending state; inspect `/api/orders`; check responsive layout, touch targets, browser console, and network errors.

## Limitations

- Sample dish data only.
- Orders are stored in memory and may reset after a restart/deployment.
- The keyboard dialog demonstrates Escape behavior but is not a full production modal implementation: focus trapping and focus restoration should be added for a real app.
- This is a learning scaffold, not a production commerce system.
