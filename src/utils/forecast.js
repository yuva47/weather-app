const request = require("postman-request");

const foreCast = (data, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=479e91c3764e7dad657812624e2e9488&query=${data}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to Connect.", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      const data = body;
      callback(undefined, {
        msg: `${data?.current?.weather_descriptions}. Its currently ${data?.current?.temperature} out. Its feels like ${data?.current?.feelslike} out`,
      });
    }
  });
};
module.exports = foreCast;
