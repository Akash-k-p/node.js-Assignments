const winston = require('winston');
const urlLogger = winston.createLogger(
    {
        transports: [
            new winston.transports.File({
                filename:'urlApi.log',
                level:'info',
                format:winston.format.combine(winston.format.timestamp(),winston.format.json())
            }),
            new winston.transports.File({
                filename:'urlApiError.log',
                level:'error',
                format:winston.format.combine(winston.format.timestamp(),winston.format.json())
            })
        ]
    }

)


module.exports = urlLogger;