'use strict';

const dotenv  = require('dotenv').config({ path: require('find-config')('.env') })
const nodeGeo = require('node-geocoder');

const options = {
  provider: 'google',
  //fetch: customFetchImplementation,
  apiKey: process.env.GOOGLE_API_KEY,
  language: 'ko',
  formatter: null // 'gpx', 'string', ...
};
const geocoder = nodeGeo (options);

module.exports = {

  getGeocode: async function (addr) {
    let res = await geocoder.geocode (addr);

    return res;
  },
  //lib.google.getGeocode("철산래미안자이아파트").catch(err => console.log(err))
  //    .then(result => console.log(result))

  getReverseGeocode: async function (lat, lon) {
    let res = await geocoder.reverse({ lat: lat, lon: lon });
    
    return res;
  },

}
