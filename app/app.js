const port = 3000;
var express = require("express"),
  mongoose = require('mongoose'),
  app = express(),
  server = require("http").createServer(app),
  path = require("path"),
  session = require('express-session');

// Server starting at port 3000
server.listen(port, (err, res) => {
  if (err) console.log(`ERROR: Connecting APP ${err}`);
  else console.log(`Server is running on port ${port}`);
});

// Connection to MongoDB
mongoose.connect(
  `mongodb://root:pass12345@mongodb:27017/sesiones?authSource=admin`,
  { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true },
  (err, res) => {
    if (err) console.log(`ERROR: connecting to Database.  ${err}`);
    else console.log(`Database Online`);
  }
);

//session middleware
app.use(session({
  secret: "gabrielitoelmejor1234567890",
  cookie: { maxAge: 24 * 60 * 60 * 1000, secure: false }, // Cookie para 1 día
  resave: true,
  saveUninitialized: true
}));

// Import routes of our app
var routes = require("./routes/main");

// view engine setup and other configurations
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "pug");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Define routes using URL path
app.use("/", routes);
module.exports = app;
