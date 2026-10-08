# Addis Eats — Making Addis Eats Fast

## Measurement method

The performance result must be measured against the production server, not the development server.

```bash
npm run build
npm run start
```

Use Chrome Lighthouse with the same page, device profile, network throttling, and browser conditions for both runs.

Recommended page:

```text
http://localhost:3000/
```

### Before run

The baseline is the project before the performance changes in this mini-project. Record the Lighthouse values before making the optimization commit.

| Metric | Before |
|---|---:|
| Performance | Run Lighthouse |
| LCP | Run Lighthouse |
| CLS | Run Lighthouse |
| INP | Run Lighthouse |

### After run

Run Lighthouse again after these changes.

| Metric | After |
|---|---:|
| Performance | Record result |
| LCP | Record result |
| CLS | Record result |
| INP | Record result |

> The repository cannot truthfully contain invented Lighthouse numbers. The two tables are intentionally ready for the real production-build measurements from the student's machine.

## What changed

### 1. Images use `next/image`

Every application image is rendered through `next/image`.

Each image now has:

- explicit `width`
- explicit `height`
- responsive `sizes`
- meaningful `alt` text

The dish records also contain the real pixel dimensions of their source files. This lets the browser reserve the correct aspect ratio before the image arrives and reduces layout shift.

### 2. Exactly one priority image

The home-page hero image is the only image using `priority`.

It is the most important above-the-fold image and is therefore the image most likely to affect LCP.

Dish-list and dish-detail images are not prioritized, so the browser can load them according to normal viewport priority.

### 3. Self-hosted font

The project uses `next/font/local` with the committed:

```text
app/fonts/Geist-Regular.woff2
```

There is no Google Fonts `<link>` and no external font request.

### 4. Third-party scripts

This application does not currently use any third-party script. Therefore there is no unnecessary third-party JavaScript to load.

If a third-party script is added later, it should use `next/script` with the least aggressive appropriate strategy, normally `lazyOnload` for non-critical analytics or widgets.

### 5. Remote image hosts

There are no remote image hosts. All application images are stored under:

```text
public/images/
```

Therefore `next.config.mjs` does not need to allow external image domains.

### 6. Environment setup

`.env.example` is committed so a new developer knows which variables are required.

Local environment files are ignored:

```text
.env
.env.local
.env.*.local
```

The session secret is **not** prefixed with `NEXT_PUBLIC_`, so it is server-only and is not intentionally exposed to the browser bundle.

## What caused the improvement

The most important expected LCP improvement comes from giving the browser an explicit, prioritized hero image. The browser knows the image dimensions immediately and can prioritize the above-the-fold resource.

The image dimensions on menu cards and dish pages primarily reduce CLS because space is reserved before images finish loading.

The self-hosted font removes an external font connection and avoids depending on a third-party font stylesheet.

## Check yourself

- Does the after run have a better LCP than the before run?
- Is the home hero the only `priority` image?
- Does every `<Image>` have width, height, sizes, and alt?
- Does the page reserve image space before images load?
- Are measurements taken with `npm run start`, not `npm run dev`?
- Can a stranger clone the repository and know which environment variables are required?
- Is `SESSION_SECRET` absent from `NEXT_PUBLIC_*` variables?
