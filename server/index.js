const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/dbConfig");
const productRoutes = require("./routes/productsRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const cors = require("cors");
const path = require("path");
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
app.use("/seller", sellerRoutes);
app.use("/product", productRoutes);
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running successfully");
  });
}

app.listen("5000", console.log(`Server Started at Port : ${PORT}`.yellow.bold));
