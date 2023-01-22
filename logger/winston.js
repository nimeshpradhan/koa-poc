import { createLogger, format, transports } from "winston";
import config from 'config';
class Logger {
  constructor() {
    this.logger = null;
    this.loggerConfig =  config.has('logger') ? config.get("logger") : null;
    this.setLogger()
  }

  setLogger = () => {
    this.logLevel = this.loggerConfig.logLevel;
    this.logger = createLogger({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.splat(),
        format.json(),
        format.printf(({ level, message, timestamp, stack, ...meta }) => {
          return `${timestamp}; ${level}: ${message} ${stack ? stack: ''} ${meta ? JSON.stringify(meta, null, 0): ""}`;
        })
      ),
      defaultMeta: { meta: 'meta' },
      handleExceptions: true,
      transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new transports.Console({ level: this.logLevel }),
        // new transports.File({ filename: "error.log", level: "error" }),
        // new transports.File({ filename: "combined.log" }),
      ],
      // rejectionHandlers: [new transports.File({ filename: "rejections.log" })],
    });
  };

  getLogger = () => {
 
    return this.logger;
  };

}

export default new Logger().getLogger();
