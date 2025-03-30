const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

mongoose.connect("mongodb://127.0.0.1:27017/ToDo")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const express = require("express");
const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
