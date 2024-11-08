const empModel = require('../models/employeeModel');
const ApiError = require('../utils/ApiError');
const exceptionHandler = require('../utils/ApiError');
const employeeLogger = require('../utils/logger');

exports.addNewEmployee = async (req, res) => {
    try {
        const newEmployee = await empModel.create(req.body);
        res.status(201).json({
            status: "success",
            message: "Employee added successfully",
            data: {
                employee: newEmployee // corrected to use the newly created employee
            }
        });
        employeeLogger.log("info", "Employee added successfully");
    } catch (err) {
        console.log("Employee failed to save");
        res.status(400).json({
            status: "fail",
            msg: "Employee registration failed",
        });
    }
}; // <-- Added closing brace and semicolon here

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await empModel.find();
        res.status(200).json({
            status: "success",
            results: employees.length,
            data: {
                employeeDetails: employees
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        });
    }
};

exports.getEmployee = async (req, res,next) => {
    try {
        const emp = await empModel.findById(req.params.id);
        if (!emp) {
            throw new Error();
        }
        res.status(200).json({
            status: "success",
            data: {
                employeeDetails: emp
            }
        });
        employeeLogger.log("info", "Employee fetched successfully");
    } catch (err) {
        employeeLogger.log("error", "failed to fetch employee details");
       next(new ApiError(500,`${req.params.id} is not found`))
    }
};

exports.updateEmployee = async (req,res) =>{
    try {
        console.log("req.body:",req.body);
        const emp  = await empModel.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            includeResultMetadata:true
        });
        console.log("emp:",emp);

        if (emp!=null){
            res.render("employees");
        }
    }
    catch(err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
            details: "please check employee id"
        });
    }

}

exports.removeEmployee = async (req, res) => {
    try {
        await empModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
            details: "please check employee id"
        });
    }
}; 

exports.getAllEmployeesDetails = async (req, res) => {
    try {
        const allEmployees = await empModel.find();
        res.render('employees', { allemployeesDetails: allEmployees });
    } catch (err) {
        console.error("Error fetching employees:", err);
        res.status(500).send("Internal Server Error");


    }
};
exports.addNewUser = async (req, res, next) => {
    try {
        console.log(req.body);
        const newEmployee = await empModel.create({
            eid: req.body.empid * 1,
            first_name: req.body.efn,
            last_name: req.body.eln,
            email: req.body.email
        });

        console.log(newEmployee);
        if(newEmployee!=null){
        return res.render("login");
        }

    } catch (err) {
        next(new ApiError(404, `${err} is not found. Failed to update.`));
    }
};

exports.showSingup = async(req,res)=> {
    return res.render("signup")
}

exports.removeUser = async(req,res)=> {
try {
const remove = await empModel.findByIdAndDelete(req.query.eid)
const allEmployees = await empModel.find();
        res.render('employees', { allemployeesDetails: allEmployees });
}
catch(err) {
    next(new ApiError(404,`${err} is not found.Failed to delete`))
}
}

exports.showUpdate = async(req,res,next)=> {
    try {
        console.log("show update called")
    const emp = await empModel.findById(req.query.eid);
      if (!emp) throw new ApiError(404, "Employee not found");
      return res.render("update", { employee: emp });
    }
    catch(err) {
        next(new ApiError(404,`${err} is not found.Failed to update`))
    }
}

exports.updateEmployeeDetails = async (req,res) =>{
    try {
        console.log("req.body:",req.body);
        const emp  = await empModel.findByIdAndUpdate(req.body.id,req.body,{
            new:true,
            runValidators:true,
            includeResultMetadata:true
        });
        console.log("emp:",emp);

        if (emp!=null){
            const allEmployees = await empModel.find();
            res.render('employees', { allemployeesDetails: allEmployees });
        }
    }
    catch(err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
            details: "please check employee id"
        });
    }

}
