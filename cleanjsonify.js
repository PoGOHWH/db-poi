#!/usr/bin/env node

// Run to format and sort the exported IITC-pogo.json file
// Automatically reads `./IITC-pogo.json` and writes to `./IITC-pogo.json`

const JSON = './IITC-pogo.json'

const writeJsonFile = require('write-json-file')
const data = require(JSON)

writeJsonFile(JSON, data, {
  indent: '  ',
  sortKeys: true
}).then(() => console.log('JSON cleaned'))
