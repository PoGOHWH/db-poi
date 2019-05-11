#!/usr/bin/env node

// Run to convert the exported IITC-pogo.json into a GeoJSON.
// Automatically reads `./IITC-pogo.json` and writes to `./IITC-pogo.geojson`

const {
  promisify
} = require('util')
const fs = require('fs')

const data = require('./IITC-pogo.json')

const gyms = Object.values(data.gyms)
  .map(({
    guid,
    lat,
    lng,
    name,
    isEx
  }) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [lng, lat]
    },
    properties: {
      pogo_type: 'gym',
      pogo_ex: isEx,
      name,
      guid
    }
  }))
const stops = Object.values(data.pokestops)
  .map(({
    guid,
    lat,
    lng,
    name
  }) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [lng, lat]
    },
    properties: {
      pogo_type: 'stop',
      name,
      guid
    }
  }))

const geojson = {
  type: 'FeatureCollection',
  features: [...gyms, ...stops]
}

promisify(fs.writeFile)('IITC-pogo.geojson', JSON.stringify(geojson, null, 4), 'utf8')
  .then(() => console.log('GeoJSON compiled'))
