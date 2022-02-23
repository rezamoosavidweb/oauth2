var express = require("express");
var app = express();
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
const cors = require("cors");
app.use(cors());

var guard = require("express-jwt-permissions")();

var port = process.env.PORT || 8080;

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-fz-a0xlh.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "Rezamoosavi.kntu@gmail.com",
  issuer: "https://dev-fz-a0xlh.us.auth0.com/",
  algorithms: ["RS256"],
});

app.use(jwtCheck);

app.get("/authorized", function (req, res) {
  res.send("Secured Resource");
});
// app.get("/products",guard.check(["see:products"]), function (req, res) {})

app.get("/products", function (req, res) {
  try {
    res.json({
      product1: "This is the first product",
      product2: "This is another product",
    });
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
});

app.listen(port);
