require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT;

require("./db/connect");
const User = require("./models/userSchema");

app.use(express.json());
app.use(cookieParser());
// routes linked
app.use(
  cors({
    origin: ["https://mern-project-mqsc.onrender.com", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(require("./router/auth"));

app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT}`);
});
