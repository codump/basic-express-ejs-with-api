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