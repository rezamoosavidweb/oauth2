const express = require("express");
const axios = require("axios");
const port = process.env.PORT || 3001;
const oAuth = require("../server/middleware/oAuth");
const app = express();

const productsAPIEndpoint = "http://localhost:8080/products";

app.use(oAuth);

app.get("/products", async (req, res) => {
  try {
    const { access_token } = req.oauth;

    const response = await axios({
      method: "get",
      url: productsAPIEndpoint,
      headers: { Authorization: `Bearer ${access_token}` },
    });
    res.json(response.data);
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      res.status(401).json("Unauthorized to access data");
    } else if (error.response.status === 403) {
      res.status(403).json("Permission denied");
    } else {
      res.status(500).json("Whoops, something went wrong");
    }
  }
});

app.listen(port, () => console.log("Started"));
