const express = require("express");
const fs = require("fs");
const employeeController = require("../controllers/employeeController");
const router = express.Router();

router.route("/")
.get(employeeController.getAllEmployeesDetails)

router.route("/signup")
.get(employeeController.showSingup)
.post(employeeController.addNewUser)

router.route("/delete")
.get(employeeController.removeUser)
module.exports=router;

router.route("/update")
.get(employeeController.showUpdate)
.post(employeeController.updateEmployeeDetails)