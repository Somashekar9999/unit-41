const express = require("express");

const app = express();

app.use(logger);

app.get("/books", (req, res) => {
  return res.send({ route: "/books" });
});

app.get("/libaries", (req, res) => {
  return res.send({ route: "/libaries" });
});

app.get("/authors", (req, res) => {
  return res.send({ route: "/authors" });
});

function logger(req, res, next) {
  if (req.path == "/books") {
    req.role = "books";
  } else if (req.path === "/libaries") {
    req.role = "libaries";
  } else if (req.path === "/authors") {
    req.role = "authors";
  } else {
    req.role = "somebody";
  }
  next();
}

function books(req, res, next) {
  console.log("before route handles books");
  next();
  console.log("after route handler books");
}

function libaries(req, res, next) {
  console.log("before route handles libaries");
  next();
  console.log("after route handler libaries");
}

function authors(req, res, next) {
  console.log("before route handles authors");
  next();
  console.log("after route handler authors");
}

app.get("/libaries", loggedIn("books"), (req, res) => {
  return res.send("yes");
});

function loggedIn(role) {
  return function logger(req, res, next) {
    if (role == "liberies") {
      return next();
    } else if (role == "authors") {
      return next();
    }
    return res.send("Not");
  };
}
