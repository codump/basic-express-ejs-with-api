# Basic Express and EJS with API

Fill in empty-config.json and rename it to config.json.
Run `npm install` and `npm start`

### What packages does it use?
- express [https://www.npmjs.com/package/express](https://www.npmjs.com/package/express)
- ejs [https://www.npmjs.com/package/ejs](https://www.npmjs.com/package/ejs)
- helmet [https://www.npmjs.com/package/helmet](https://www.npmjs.com/package/helmet)
- express-rate-limit [https://www.npmjs.com/package/express-rate-limit](https://www.npmjs.com/package/express-rate-limit)

### Emulate data
Make sure you have the correct setting of `true` or `false` in the config.json. Else this might lead to unexpected data being overwritten by the emulated data. This function is added for those who often code with realtime data. But since there are times the livefeed is empty and there still needs to be data to continuing development. There is this function to emulate it via json files when the API gives an empty responce. 

## Specific parts of the code
### Helmet
This part can give some inexperienced users a headache. Because their code is correct yet it doesn't work while they implement it. That's because the connection to a source is rejected. To allow access you'll need to add the source in the code below.
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