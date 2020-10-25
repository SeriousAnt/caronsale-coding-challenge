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

    /**
     * Authenticates user and returns access token
     */
    public async authenticate(): Promise<string> {
        this.logger.log(`Authenticating ${this.config.apiUser} to API`);
        const req: IAuthenticationRequest = {
            password: Utility.hashPasswordWithCycles(this.config.apiPassword, this.config.apiPasswordHashCycles),
            meta: '',
        }
        const response = await this.request.put(this.baseUrl + '/' + this.config.apiUser).send(req);
        if (response && response.body) {
            return response.body.token;
        } else if (response.error) {
            throw new Error(response.error.message);
        }
    }
}

interface IAuthenticationRequest {
    password: string;
    meta: string;
}