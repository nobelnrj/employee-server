const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const compression = require("compression");
const helmet = require("helmet");

const PORT = process.env.PORT || 3000;

require("./employee");

server.use(bodyParser.json());
server.use(compression());
server.use(helmet());

const Employee = mongoose.model("employee");
const mongoUri =
  "mongodb+srv://nobel:nobel200398@cluster0-aypx6.gcp.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.connection.on("connected", () => {
  console.log("connected!!!!!");
});

mongoose.connection.on("error", () => {
  console.log("error!!!!");
});

server.get("/", (req, res) => {
  Employee.find({}).then((data) => {
    res.send(data);
  });
});

server.post("/send-data", (req, res) => {
  const employee = new Employee({
    photo: req.body.photo,
    name: req.body.name,
    position: req.body.position,
    phone: req.body.phone,
    email: req.body.email,
    salary: req.body.salary,
  });
  employee
    .save()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

server.post("/delete", (req, res) => {
  Employee.findByIdAndDelete(req.body.id)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

server.post("/update", (req, res) => {
  Employee.findByIdAndUpdate(req.body.id, {
    photo: req.body.photo,
    name: req.body.name,
    position: req.body.position,
    phone: req.body.phone,
    email: req.body.email,
    salary: req.body.salary,
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

server.listen(PORT, () => {
  console.log("server runnning");
});
