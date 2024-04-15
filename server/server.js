const express = require("express");
const app = express();
const cors = require("cors");
const user = require("./Router/user");

app.use(
  cors({
    origin: "http://localhost:3000", // Your Next.js frontend URL
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", user);

app.listen(5000, () => {
  console.log("app is listining in 5000 ");
});
