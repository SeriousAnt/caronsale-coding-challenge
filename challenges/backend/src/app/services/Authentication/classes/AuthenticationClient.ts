import { inject, injectable } from 'inversify';
import * as superagent from 'superagent';

import { DependencyIdentifier } from '../../../DependencyIdentifiers';
import { IConfig } from '../../Configuration/interface/IConfig';
import { ILogger } from '../../Logger/interface/ILogger';
import { IAuthenticationClient } from '../interface/IAuthenticationClient';
import { Utility } from './Utility';

@injectable()
export class AuthenticationClient implements IAuthenticationClient {


    public constructor(@inject(DependencyIdentifier.LOGGER) private logger: ILogger, @inject(DependencyIdentifier.CONFIG) private config: IConfig) {
    }


    private baseUrl = `${this.config.apiEndpoint}/authentication`;
    private request = superagent.agent();

    public async authenticate(): Promise<any> {
        this.logger.log(`Authenticating ${this.config.apiUser} to API`);
        const req: IAuthenticationRequest = {
            password: Utility.hashPasswordWithCycles(this.config.apiPassword, this.config.apiPasswordHashCycles),
            meta: '',
        }
        return this.request.put(this.baseUrl + '/' + this.config.apiUser).send(req);
    }
}

interface IAuthenticationRequest {
    password: string;
    meta: string;
}