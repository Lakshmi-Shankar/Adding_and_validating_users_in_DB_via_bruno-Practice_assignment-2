const express = require('express');
const { resolve } = require('path');
const userLogin = require("./logSchema");
const User = require("./signSchema");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
require("dotenv").config();   

const app = express();
const port = 3010;
const URI = process.env.URI;

app.use(express.json());
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

mongoose.connect(URI)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });

app.post("/postuserlogin", async (req, res) => {
  try {
    const { mail, password } = req.body;

    if (!mail || !password) {
      return res.status(400).json({ Message: "All fields are required" });
    }

    // Check if user exists
    const findUser = await User.findOne({ mail });
    if (!findUser) {
      return res.status(404).json({ Message: "User not found" });
    }

    // Verify password
    const match = await bcrypt.compare(password, findUser.password);
    if (!match) {
      return res.status(401).json({ Message: "Incorrect password" });
    }

    // Save login attempt only after successful authentication
    await new userLogin({ mail }).save();

    return res.status(200).json({ Message: "Login Successful" });

  } catch (err) {
    return res.status(500).json({ Message: "Error", Error: err.message });
  }
});
