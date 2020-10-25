import * as superagent from 'superagent';
import { inject, injectable } from 'inversify';

import { DependencyIdentifier } from '../../../DependencyIdentifiers';
import { IAuthenticationClient } from '../../Authentication/interface/IAuthenticationClient';
import { IConfig } from '../../Configuration/interface/IConfig';
import { ILogger } from '../../Logger/interface/ILogger';
import { ICarOnSaleClient } from '../interface/ICarOnSaleClient';

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

    public printAuctionsOverview(auctions: IAuction[]): void {
        this.logger.log(`Currently running auctions: ${auctions.length}`);
        this.logger.log(`Average number of bids: ${this.calculateNumberOfBidsAverage(auctions)}`);
        this.logger.log(`Average completion of all auctions: ${this.calculateAuctionCompletionAverage(auctions) * 100}%`);
    }

    private calculateAuctionCompletion(auction: IAuction): number {
        if (!auction.minimumRequiredAsk) { auction.minimumRequiredAsk = 0 };
        if (!auction.currentHighestBidValue || auction.currentHighestBidValue === 0) { return 0 };
        return auction.minimumRequiredAsk > auction.currentHighestBidValue ? auction.currentHighestBidValue / auction.currentHighestBidValue : 1;
    }

    private calculateAuctionCompletionAverage(auctions: IAuction[]): number {
        return auctions.map(this.calculateAuctionCompletion).reduce((p, c) => p + c, 0) / auctions.length;
    }

    private calculateNumberOfBidsAverage(auctions: IAuction[]): number {
        return auctions.map(a => a.numBids).reduce((p, c) => p + c, 0) / auctions.length;
    }
}

export interface IAuction {
    id: string;
    label: string;
    endingTime: Date;
    startedAt: Date;
    numBids: number;
    minimumRequiredAsk: number;
    currentHighestBidValue: number;
}