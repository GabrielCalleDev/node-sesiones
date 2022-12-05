const port = 3000;
var express = require("express"),
  app = express(),
  server = require("http").createServer(app),
  path = require("path");

server.listen(port, (err, res) => {
  if (err) console.log(`ERROR: Connecting APP ${err}`);
  else console.log(`Server is running on port ${port}`);
});

// Import routes of our app
var routes = require("./routes/main");

// view engine setup and other configurations
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "pug");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Define routes using URL path
app.use("/", routes);
module.exports = app;
