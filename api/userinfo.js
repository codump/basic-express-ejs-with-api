const { emulateData } = require('../config.json');
const { query, validationResult } = require('express-validator');
const { sanitize } = require('express-xss-sanitizer');
const fs = require('node:fs');
const fsPromises = fs.promises;

var UserInfo = async function (req, res) {
  let endObject = []
  let response
  if(emulateData === true) {
    async function loadFile() {
      const data = await fsPromises.readFile('./emulateData/users.json');
      const toJ = Buffer.from(data)
      return toJ;
    }
    endObject = await loadFile();
    //endObject = response.toString()
  }

  const result = validationResult(req);
  if (result.isEmpty()) {
    const uid = req.params.uid

    const searchAndFindUser = async (users, keyword) => {
      const parse = JSON.parse(users)
      return parse.find(obj => obj._id === keyword);
    }

    endObject = await searchAndFindUser(endObject, uid);
    if(typeof endObject === 'object' && endObject !== null) {
      return res.send(endObject);
    } else {
      res.send({ errors: [{"error": "No user found"}] });
    }
  }
  res.send({ errors: result.array() });

  //res.send(endObject);
}

module.exports = UserInfo;