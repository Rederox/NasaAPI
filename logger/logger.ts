import winston from "winston";

const customLevels = {
    levels: {
        error: 0,
        info: 1,
    },
    colors: {
        error: 'red',
        info: 'blue',
    }
}
winston.addColors(customLevels.colors);

const logger = winston.createLogger({
    levels: customLevels.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'DD-MM-YYYY HH:mm:ss'
        }),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),

    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(
                    info => `${info.timestamp} ${info.level}: ${info.message}`
                )
            ),
        }),
        new winston.transports.File({ level: 'info',filename: 'logs/info.log'}),
        new winston.transports.File({level: 'error', filename: 'logs/error.log'})

    ],

});

export default logger;
