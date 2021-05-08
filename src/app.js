const express = require("express");
const config = require("./config.json");
const app = express();
const port = process.env.PORT || 3000;

const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const staticPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
console.log(staticPath);

app.set("view engine", "hbs");
app.set("views", viewPath);
app.use(express.static(staticPath));
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  const title = "Weather";
  const footer = "Created by Isaac.";
  res.render("index", { title, footer });
});

app.get("/about", (req, res) => {
  const title = "About Me";
  const imgSrc = "./img/robot.png";
  const footer = "Created by me.";
  res.render("about", { title, imgSrc, footer });
});

app.get("/help", (req, res) => {
  const title = "Help";
  const msg = "Some message";
  const footer = "Created by me.";
  res.render("help", { title, msg, footer });
});

app.get("/help/*", (req, res) => {
  const title = "404";
  const msg = "Article not found";
  const footer = "Created by me.";
  res.render("404", { title, msg, footer });
});

app.get("/weather", (request, res) => {
  const queryString = request.query;
  if (!queryString.address) {
    return res.send({ error: "No Parameter Address Found" });
  }

  geoCode(
    queryString.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(`${longitude},${latitude}`, (error, forecast) => {
        if (error) {
          return res.send({ error });
        }
        return res.send({
          forecast: forecast.msg,
          location,
          address: queryString.address,
        });
      });
    }
  );
});

app.get("*", (req, res) => {
  const title = "404";
  const msg = "Page Not Found";
  const footer = "Created by Isaac.";
  res.render("404", { title, msg, footer });
});

app.listen(port, () => {
  console.log(`Hosting Started in port ${config.port || 1000}`);
});
