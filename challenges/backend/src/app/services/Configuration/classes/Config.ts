import { injectable } from 'inversify';
import { IConfig } from '../interface/IConfig';

@injectable()
export class Config implements IConfig {
    public readonly apiEndpoint = 'https://caronsale-backend-service-dev.herokuapp.com/api';
    public readonly apiUser = 'salesman@random.com';
    public readonly apiPassword = '123test';
    public readonly apiPasswordHashCycles = 5;
}