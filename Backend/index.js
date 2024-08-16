// dependencies
const dotenv = require("dotenv");
const cors = require('cors')
const express = require("express");
const mongoDBconnection = require("./service/MongoDB");
const userRouter = require("./routes/user");

// config
dotenv.config();
let app = express();
app.use(cors())

// middlewares
app.use(express.json());

// route
app.use("/api/v1/user", userRouter);

// server running
app.listen(process.env.PORT, () => {
  console.log("server running at port = " + process.env.PORT);
});
// database connection
mongoDBconnection(process.env.MONGODB_URL);
