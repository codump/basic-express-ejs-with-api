const { version, port, consoleLogErrors, baseURL, secretBearerToken } = require('./config.json');
const express = require('express');
const path = require('node:path');
const router = express.Router(); 
const helmet =  require('helmet');
const rateLimit = require('express-rate-limit');
const { xss } = require('express-xss-sanitizer');
const { query, param } = require('express-validator');
const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');

// Deluxe version
const Markdown = require('markdown-it');
const hljs = require('highlight.js');
// Deluxe version

// Set app config
var app = module.exports = express(); // Make app
app.set('view engine', 'ejs'); // View engine
app.set('views', path.join(__dirname, 'views')); // Views path
// Set app config

// Set app use
app.use("/", router); 
app.use(express.static(__dirname + '/public')); // Public path for e.g. images and css
// Middleware to protect routes using JWT
const jwtMiddleware = expressJwt({ secret: secretBearerToken, algorithms: ['HS256'] });
// Security headers, blocks all content thats not from the server itself or listed sites
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'default-src': "'self'",
        'script-src': ["'self'"],
        'connect-src': ["'self'"],
        'style-src': ["'self'", "fonts.googleapis.com", "fonts.gstatic.com", "cdnjs.cloudflare.com"],
        'img-src': [
          "'self'", 'data:', "github.githubassets.com", "avatars.githubusercontent.com"
        ],
        'frame-src': ["'self'"],
        'worker-src': ["'none'"],
        upgradeInsecureRequests: null
      },
    },
  }),
);
// Security headers
app.use(xss()); // use xss sanitizer
// Set app use

// Get and render pages
// Index
app.get('/', async (req, res) => {
  res.locals.page = 'index'; // Pass param to locals
  res.locals.version = version;

  res.render('index', { 
    pageTitle: `Basic Express and EJS with API`, // Pass param to ejs template
    pageWelcome: `Howdy fellow syntax plumber!`
  });
});
// Index
// apidemo
app.get('/apidemo', async (req, res) => {
  res.locals.page = 'apidemo';
  res.locals.version = version;

  var ip;
  if (req.headers['x-forwarded-for']) {
      ip = req.headers['x-forwarded-for'].split(",")[0];
  } else if (req.socket && req.socket.remoteAddress) {
      ip = req.socket.remoteAddress;
  } else {
      ip = req.ip;
  }
  const bearerToken = jwt.sign({ ip: ip }, secretBearerToken, { expiresIn: '1h' });
  res.cookie("jwt", bearerToken, { httpOnly: false, secure: false });

  // Get all users
  const fetchUsers = async () => {
    let response = await fetch(`${baseURL}/api/bearerexample`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${bearerToken}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data
    } else {
      if(consoleLogErrors) {
        console.log(response)
      }
    }
  }
  const users = await fetchUsers();
  // Get all users

  res.render('apidemo', { 
    pageTitle: `Basic Express and EJS with API`, // Pass param to ejs template
    pageWelcome: `Howdy fellow syntax plumber!`,
    users: users
  });

});
// apidemo

// Deluxe version
// README
app.get('/readme', async (req, res) => {
  res.locals.page = 'readme'; 
  res.locals.version = version;
  
  const md = Markdown({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }
      return ''; // use external default escaping
    }
  });
  // USE ONLY for sources you trust, namely your own README.md https://raw.githubusercontent.com/highlightjs/highlight.js/main/README.md
  await fetch('https://raw.githubusercontent.com/codump/basic-express-ejs-with-api/main/README.md').then(response => response.text())
  .then(result => { html = md.render(result) } );

  res.render('readme', { 
    pageTitle: `Basic Express and EJS with API`, // Pass param to ejs template
    pageWelcome: `Howdy fellow syntax plumber!`,
    mdToHTML: html,
  });

});
// README
// Deluxe version

// Get and render pages

// API
// Rate limiter
const limiterDefault = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8:   combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more  aggressive
})
// Rate limiter
// Example
const Example = require('./api/example')
app.get('/api/example', limiterDefault, Example);
app.get('/api/bearerexample', jwtMiddleware, limiterDefault, Example); 
// Example
// Get user info
const UserInfo = require('./api/userinfo')
const validateUid = () => param('uid').notEmpty().escape(); // Sanitization and validation
app.get('/api/userinfo/:uid', validateUid(), limiterDefault, UserInfo); 
app.get('/api/beareruserinfo/:uid', jwtMiddleware, validateUid(), limiterDefault, UserInfo); 
// Get user info
// API

// Start app
app.listen(port, () => {
  console.log(`Web app listening on port ${port}`)
})