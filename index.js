const express = require("express");
const path = require("path");
const port = 8000;
const db = require("./config/mongoose");
const Contact = require("./models/contact");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

// app.use(function (req, res, next) {
//   next();
// })

// var contactList = [
//   {
//     name: "rohit tyagi",
//     phoneNumber: "1234567890",
//   },
//   {
//     name: "aniket nagar",
//     phoneNumber: "0909090909",
//   },
//   {
//     name: "junaid",
//     phoneNumber: "1212121212",
//   },
// ];

app.get("/", function (req, res) {
  console.log(res);
  return res.render("/home");
});

app.get("/contactList", function (req, res) {

  Contact.find({}, function (err, Contacts) {
    if (err) {
      console.log("there is error in fetching data");
    }
    return res.render("practice", { Contact_list: Contacts });
  });
});

app.post("/createContact", function (req, res) {
  // console.log(req.body.number);
  // contactList.push(req.body);

  Contact.create(
    {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
    },
    function (err, newContact) {
      if (err) {
        console.log("error in creating contact");
        return;
      }

      // Console.log("**********", newContact);
      return res.redirect("/contactList");
    }
  );
});

app.get("/delete-contact/", function (req, res) {
  let id = req.query.id;
  console.log(id);
  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("there is some error in deleting");
      return;
    }
    return res.redirect("/contactList");
  });
});

app.listen(port, function (err) {
  if (err) {
    console.log("server is not running in port", port);
  }
  console.log("server is running in port", port);
});
