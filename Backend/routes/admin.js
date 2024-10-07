let express = require("express");
const { adminGetUserByEmail } = require("../controllers/admin");

let adminRoute = express.Router();

adminRoute.route("/DU/getuserbyemail/:email").get(adminGetUserByEmail);

module.exports = adminRoute;