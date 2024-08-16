const { default: mongoose } = require("mongoose");

async function mongoDBconnection(url) {
  await mongoose
    .connect(url)
    .then(() => console.log("mongoDB Connected"))
    .catch((err) => console.log("mongoDB Error", err));
}

module.exports = mongoDBconnection;
