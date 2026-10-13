# Addis Eats — Performance

## Measurement method

Run a production build and measure the production server, not `npm run dev`.

```bash
npm run build
npm run start
```

Use Lighthouse with the same URL, device profile, and throttling for both runs.

## Before

Record the original Lighthouse scores from the first production-build run here:

| Metric | Before |
|---|---:|
| Performance | Record from Lighthouse |
| LCP | Record from Lighthouse |
| CLS | Record from Lighthouse |
| INP | Record from Lighthouse |

## After

Record the second production-build run here:

| Metric | After |
|---|---:|
| Performance | Record from Lighthouse |
| LCP | Record from Lighthouse |
| CLS | Record from Lighthouse |
| INP | Record from Lighthouse |

## Changes

- Images use `next/image` with explicit width, height, sizes, and meaningful alt text.
- Exactly one image uses `priority`: the home-page hero image.
- The font is self-hosted through `next/font/local`.
- There is no render-blocking font `<link>` tag.
- Third-party scripts are not loaded by the application.
- `.env.example` documents the required environment variables.
- Local environment files are ignored and no secret uses the `NEXT_PUBLIC_` prefix.

## What should improve

The image sizing and the single prioritized hero image should reduce layout movement and improve LCP. The self-hosted font avoids an external font request. The exact improvement must be reported from the two real Lighthouse runs.
