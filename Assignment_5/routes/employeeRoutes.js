const express = require("express");

// const employeeHandler = require("../handlers/employeeHandler");
const fs = require("fs");
const employeeController = require("../controllers/employeeController");
const router = express.Router();

router.route("/")
.post(employeeController.addNewEmployee)
.get(employeeController.getAllEmployees)
router.route("/:id")
 .get(employeeController.getEmployee)
 .patch(employeeController.updateEmployee)
 .delete(employeeController.removeEmployee);

// router.route() 


// router.route("/:id")
//     .get(employeeContro.getEmployee)
//     .delete(employeeHandler.removeEmployee);



module.exports=router;