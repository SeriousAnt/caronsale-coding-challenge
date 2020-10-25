import 'reflect-metadata';

import * as winston from 'winston'
import { ILogger } from '../interface/ILogger';
import { injectable } from 'inversify';

@injectable()
export class Logger implements ILogger {

    private logger: winston.Logger;

    public constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.printf(log => `[LOG] ${log.message}`),
            transports: [
                new winston.transports.Console(),
            ],
        });

    }

    public log(message: string): void {
        this.logger.info(message);
    }
}