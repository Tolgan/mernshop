const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Tolga YAMİC",
    email: "tolga@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "babayaro",
    email: "babayaro@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = users;
