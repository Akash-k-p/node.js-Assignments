const express = require('express');
const mongoose = require('mongoose');
const urlRoutes = require('./routes/urlRoutes');
const app = express();
const errorHandler  = require("./controllers/errorController");
const globalErrorHandler = require("./utils/ApiError");
const ApiError = require("./utils/ApiError");


app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// Use URL routes
app.use('/api/urls', urlRoutes);

app.all("*",(req,res,next)=>{
    // res.status(404).json({
    //     status:"failed",
    //     message:`${req.originalUrl} is not found .Please check again`
    // })
    // creating error
    // const error = new Error(`${req.originalUrl} is not found `)
    // error.statusCode=404
    // error.status="Bad Request"
    // passing to middleware - error middleware
    next(new ApiError(404,`${req.originalUrl} is not found`))

})
// error handling using middleware
app.use(errorHandler.errorMiddleware)

module.exports = app;
