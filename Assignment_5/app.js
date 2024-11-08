const express = require("express");
// const fs = require("fs");
//creating express app
const app = express();
const path = require("path");
const employeeRouter = require("./routes/employeeRoutes");
const webEmployeeRouter = require("./routes/empRoutes");
const errorHandler  = require("./controllers/errorController");
const globalErrorHandler = require("./utils/ApiError");
const ApiError = require("./utils/ApiError");
// const port = 8000;
// const employeeRouter = require("./routes/employeeRoutes");
//add middleware
// Returns middleware that only parses json and only looks at requests
// 'where the Content-Type header matches the type option.

// app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
// app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended:false}));
app.use('/api/v1/employees', employeeRouter);
app.use("/web/employees", webEmployeeRouter);

app.all("*", (req, res,next) => {                        
    // res.status(404).json({
    //     status: "fail",
    //     message: `${req.originalUrl} is not found. please check again `
    // }); 
    // creating error 
    // const error =  new Error(`${req.originalUrl} is not found. please check again `)
    // error.statusCode = 404;
    // error.status="Bad Request";
    // passing to error middleware
    next(new ApiError(404, `${req.originalUrl} is not found `));
});
app.use(errorHandler.errorMiddleware);
// app.use((error, req, res, next) => {
//     error.statusCode = error.statusCode || 500;
//     error.status = error.status || "error";
//     res.status(error.statusCode).json({
//         status: error.status,
//         message: error.message
//     });

// });
module.exports = app;
