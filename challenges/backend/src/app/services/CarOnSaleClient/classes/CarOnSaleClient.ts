import * as superagent from 'superagent';
import { inject, injectable } from 'inversify';

import { DependencyIdentifier } from '../../../DependencyIdentifiers';
import { IAuthenticationClient } from '../../Authentication/interface/IAuthenticationClient';
import { IConfig } from '../../Configuration/interface/IConfig';
import { ILogger } from '../../Logger/interface/ILogger';
import { ICarOnSaleClient } from '../interface/ICarOnSaleClient';
import { IAuction } from '../../../AuctionsReport';

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.AUTH) private authClient: IAuthenticationClient,
        @inject(DependencyIdentifier.CONFIG) private config: IConfig
    ) { }

    private baseUrl = `${this.config.apiEndpoint}/v2/auction/buyer/`;
    private request = superagent.agent();

    public async getRunningAuctions(): Promise<IAuction[]> {
        const authResponse = await this.authClient.authenticate();
        this.logger.log('Requesting all running auctions');
        const auctionsResponse = await this.request.get(`${this.baseUrl}`)
            .set('userid', authResponse.userId)
            .set('authtoken', authResponse.token);
        return auctionsResponse.body.items;
    }
}