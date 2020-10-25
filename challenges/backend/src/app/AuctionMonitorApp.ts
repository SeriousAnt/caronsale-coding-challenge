import "reflect-metadata";

import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";

import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { AuctionsReport } from "./AuctionsReport";

@injectable()
export class AuctionMonitorApp {

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.COS_CLIENT) private carOnSaleClient: ICarOnSaleClient,
    ) { }

    public async start(): Promise<void> {
        this.logger.log(`Auction Monitor started.`);
        const auctions = await this.carOnSaleClient.getRunningAuctions()
        this.logger.log(`Currently running auctions: ${auctions.length}`);
        this.logger.log(`Average number of bids: ${AuctionsReport.calculateNumberOfBidsAverage(auctions)}`);
        this.logger.log(`Average completion of all auctions: ${AuctionsReport.calculateAuctionCompletionAverage(auctions) * 100}%`);
        return;
    }

}