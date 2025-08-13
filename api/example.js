const { emulateData } = require('../config.json');
const fs = require('node:fs');
const fsPromises = fs.promises;

var Example = async function(req, res) {
  let endObject = []
  if(emulateData === true) {
    async function loadFile() {
      const data = await fsPromises.readFile('./emulateData/users.json');
      const toJ = Buffer.from(data)
      return toJ;
    }
    response = await loadFile();
    endObject =JSON.parse(response)
  }

  res.send(endObject);
}

module.exports = Example;