const userModel = require("../models/user");

async function adminGetUserByEmail(req, res) {
    let { email } = req.params;
    try {
      let user = await userModel.find({ email: { $regex: email, $options: 'i' } });
      res.send({ user });
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while fetching the user.' });
    }
  }

module.exports = { adminGetUserByEmail };
