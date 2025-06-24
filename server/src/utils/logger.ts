// base format [timestamp] [log level] [message]


const colors = {
    INFO : "\x1b[32m", // Green
    LOG : "\x1b[34m", // Blue
    WARN : "\x1b[33m", // Yellow
    ERROR: "\x1b[31m", // Red
    RESET: "\x1b[0m",  // Reset color
    MAGENTA: "\x1b[35m" // Magenta
} 

export class Logger{
    static log(message: any) {
        console.log(`${colors.MAGENTA}[${new Date().toLocaleString()}]${colors.LOG} [LOG] ${colors.LOG}${message}${colors.RESET}`);
    }

    static info(message: any) {
        console.info(`${colors.MAGENTA}[${new Date().toLocaleString()}]${colors.INFO} [INFO] ${colors.INFO}${message}${colors.RESET}`);
    }

    static warn(message: any) {
        console.warn(`${colors.MAGENTA}[${new Date().toLocaleString()}]${colors.WARN} [WARN] ${colors.WARN}${message}${colors.RESET}`);
    }

    static error(message: any) {
        console.error(`${colors.MAGENTA}[${new Date().toLocaleString()}]${colors.ERROR} [ERROR] ${colors.ERROR}${message}${colors.RESET}`);
    }
}

// Logger.log("Logger initialized successfully.");
// Logger.info("This is an info message.");
// Logger.warn("This is a warning message.");
// Logger.error("This is an error message.");
