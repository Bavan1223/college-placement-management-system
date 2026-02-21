const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("./models/user.model");

async function seed() {
  await mongoose.connect("mongodb://localhost:27017/cpms");

  const hashed = await bcrypt.hash("admin123", 10);

  await User.deleteMany({ email: "admin@test.com" }); // remove old if exists

  await User.create({
    first_name: "Admin",
    email: "admin@test.com",
    number: "9999999999",
    password: hashed,
    role: "management_admin"
  });

  console.log(" Management admin created");
  process.exit();
}

seed();