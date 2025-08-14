# Basic Express and EJS with API

[![GitHub Clones](https://img.shields.io/badge/dynamic/json?color=success&label=Clones&query=count&url=https://gist.githubusercontent.com/kipBO/1728b121ca53ab55b8b479bf6743de96/raw/clone.json&logo=github)](https://github.com/MShawon/github-clone-count-badge)
 ![Commits](https://badgen.net/github/commits/codump/basic-express-ejs-with-api?cache=300) ![LastUpdate](https://badgen.net/github/last-commit/codump/basic-express-ejs-with-api?cache=300) ![DependaBot](https://badgen.net/github/dependabot/codump/basic-express-ejs-with-api?cache=300)

## 🚀 Getting Started

1. Rename `empty-config.json` to `config.json` and fill in your settings.
2. Install dependencies:  
   `npm install`
3. Start the server:  
   `npm start`

---

## 📦 Core Dependencies

- [express](https://www.npmjs.com/package/express) – Web framework for Node.js  
- [ejs](https://www.npmjs.com/package/ejs) – View template engine  
- [helmet](https://www.npmjs.com/package/helmet) – Adds security headers  
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) – Controls request rate  
- [express-xss-sanitizer](https://www.npmjs.com/package/express-xss-sanitizer) – Prevents XSS attacks  
- [express-validator](https://www.npmjs.com/package/express-validator) – Validates incoming data  
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) – Create and verify JWTs  
- [express-jwt](https://www.npmjs.com/package/express-jwt) – JWT authentication middleware  

> **Note:** Only the **Deluxe version** is available for now.

---

## 💎 Deluxe Extras

- [markdown-it](https://www.npmjs.com/package/markdown-it) – Markdown parsing  
- [highlight.js](https://www.npmjs.com/package/highlight.js) – Syntax highlighting  

---

## 🧪 Emulated Data Mode

When enabled in `config.json` ("emulateData": true), the app serves JSON-based mock data when API responses are empty. This is useful for development when the live feed is unavailable.

⚠ **Caution:** Misconfiguration can overwrite live data.

---

## Specific parts of the code
### Helmet
This part can be tricky for beginners. Even if your code is correct, it may fail because the browser blocks connections to unlisted sources. To fix this, add the required source URLs to the configuration shown below. [`Reference`][1]
```javascript
// Security headers, blocks all content thats not from the server itself or listed sites
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'default-src': "'self'",
        'script-src': "'self'",
        'connect-src': ["'self'"],
        'style-src': ["'self'", "fonts.googleapis.com", "fonts.gstatic.com", "cdnjs.cloudflare.com"],
        'img-src': [
          "'self'",
          'data:',
          "github.githubassets.com"
        ],
        'frame-src': ["'self'"],
        'worker-src': ["'none'"],
      },
    },
  }),
);
// Security headers
```

### express-rate-limit
To adjust the rate limit or time window, modify the configuration below. You can also create a separate `const limiterExtraSecure` with stricter settings for sensitive API endpoints where you want to further limit requests. [`Reference`][2]
```js
// Rate limiter
const limiterDefault = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8:   combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more  aggressive
})
// Rate limiter
```

[1]: https://helmetjs.github.io/#reference
[2]: https://express-rate-limit.mintlify.app/reference/configuration
