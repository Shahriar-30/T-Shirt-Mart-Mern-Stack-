// dependencies
const dotenv = require("dotenv");
const cors = require('cors');
const express = require("express");
const mongoDBconnection = require("./service/MongoDB");
const userRouter = require("./routes/user");
const adminRoute = require("./routes/admin");

// config
dotenv.config();
let app = express();
app.use(cors())

// middlewares
app.use(express.json());

// route
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRoute);

// server running
app.listen(process.env.PORT, () => {
  console.log("server running at port = " + process.env.PORT);
});
// database connection
mongoDBconnection(process.env.MONGODB_URL);
