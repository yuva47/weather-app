const request = require("postman-request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoieXV2YTQ3IiwiYSI6ImNrbnl1a2xhajA3MGoycG1rZnYzYjBpdWIifQ.U8N1oACSQlaHFUDZwUPsHA&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to Connect.", undefined);
    } else if (body?.features?.length === 0) {
      callback("No location found.", undefined);
    } else {
      const data = {
        latitude: [...body.features].shift().center[0],
        longitude: [...body.features].shift().center[1],
        location: [...body.features].shift().place_name,
      };
      callback(undefined, data);
    }
  });
};

module.exports = geoCode;
