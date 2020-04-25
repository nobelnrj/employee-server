const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  photo: String,
  name: String,
  position: String,
  phone: String,
  email: String,
  salary: String,
});

mongoose.model("employee", EmployeeSchema);
