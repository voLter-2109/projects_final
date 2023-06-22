const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
// мы хотим сменить порт на указанный в файле .env, но изначально приложение его не видит,
// для этого использует библиотеку dotenv
require("dotenv").config();

const app = express();

app.use(logger("dev"));
app.use(cors());
// слудующие 2 строки позволяют посылать тело в запросах, так как express этого не видит
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use("/api/user", require("./routes/users"));
app.use("/api/employees", require("./routes/employees"));

module.exports = app;
