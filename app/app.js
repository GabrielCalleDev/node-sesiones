"use strict"

const port   = 3000
const express  = require("express"),
  mongoose = require('mongoose'),
  app      = express(),
  server   = require("http").createServer(app),
  path     = require("path"),
  session  = require('express-session')

// Server starting at port 3000
server.listen(port, (err, res) => {
  if (err) console.log(`ERROR: Connecting APP ${err}`)
  else console.log(`Server is running on port ${port}`)
});

// Connection to MongoDB
mongoose.connect(
  `mongodb://root:pass12345@mongodb:27017/sesiones?authSource=admin`,
  { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true },
  (err, res) => {
    if (err) console.log(`ERROR: connecting to Database.  ${err}`)
    else console.log(`Database Online`)
  }
);

//session middleware
app.use(session({
  secret: "Gabriel programando node.js",
  cookie: { maxAge: 24 * 60 * 60 * 1000, secure: false }, // Cookie para 1 día
  resave: true,
  saveUninitialized: true
}))

// view engine setup and other configurations
app.set("views", path.join(__dirname,"views"))
app.set("view engine", "pug")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

// Import routes of our app
const routes = require("./routes/main")
// mount the routes on the app
app.use("/", routes)

module.exports = app
