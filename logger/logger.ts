import winston from "winston";

const customLevels = {
    levels: {
        error: 0,
        info: 1,
        warn: 2,
        silly: 3,
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        silly: 'blue',
    }
}
winston.addColors(customLevels.colors);

const logger = winston.createLogger({
    levels: customLevels.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'DD-MM-YYYY HH:mm:ss'
        }),
        winston.format.printf(silly => `${silly.timestamp} ${silly.level}: ${silly.message}`)
    ),

    transports: [
        new winston.transports.Console({
            level: 'silly',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(
                    silly => `${silly.timestamp} ${silly.level}: ${silly.message}`
                )
            ),
        }),

        new winston.transports.File({ level: 'silly',filename: 'logs/combined.log'}),
        new winston.transports.File({ level: 'info',filename: 'logs/info.log'}),
        new winston.transports.File({level: 'error', filename: 'logs/error.log'}),
        new winston.transports.File({ level: 'warn', filename: 'logs/warn.log'}),

    ],

});

export default logger;
