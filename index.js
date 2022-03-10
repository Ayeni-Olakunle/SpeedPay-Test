const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", require("./route/API/product"));

app.listen(PORT, () => {
  console.log("Server Started on port: ", PORT);
});
