const express = require("express");
const bodyParser = require("body-parser");
const productRouter = require("./src/routes/product");
const categoryRouter = require("./src/routes/category");
const historyRouter = require("./src/routes/history");
const env = require("./src/helpers/env");
// const morgan = require("morgan");

const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(morgan("dev"));

app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/history", historyRouter);

app.listen(env.port, () => {
   console.log(`Server started on port : ${env.port}`);
});
