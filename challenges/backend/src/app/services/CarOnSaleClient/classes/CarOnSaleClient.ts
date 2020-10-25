import * as superagent from 'superagent';
import { inject, injectable } from 'inversify';

import { DependencyIdentifier } from '../../../DependencyIdentifiers';
import { IAuthenticationClient } from '../../Authentication/interface/IAuthenticationClient';
import { IConfig } from '../../Configuration/interface/IConfig';
import { ILogger } from '../../Logger/interface/ILogger';

@injectable()
export class CarOnSaleClient {
    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.AUTH) private authClient: IAuthenticationClient,
        @inject(DependencyIdentifier.CONFIG) private config: IConfig
    ) { }

    private baseUrl = `${this.config.apiEndpoint}/v2/internal/auction/seller`;
    private request = superagent.agent();


    public async getRunningAuctions(): Promise<any /* TODO: Introduce a type */> {
        const authResponse = await this.authClient.authenticate();
        return this.request.get(`${this.baseUrl}/${authResponse.userId}/running`)
            .set('userid', authResponse.userId)
            .set('authtoken', authResponse.token);
    }

}