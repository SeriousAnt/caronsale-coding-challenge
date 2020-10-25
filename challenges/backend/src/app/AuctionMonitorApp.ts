import "reflect-metadata";

import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";

import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";

@injectable()
export class AuctionMonitorApp {

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.COS_CLIENT) private carOnSaleClient: ICarOnSaleClient,
    ) { }

    public async start(): Promise<void> {

        this.logger.log(`Auction Monitor started.`);
        const auth = this.carOnSaleClient.getRunningAuctions().then(auctions => {
            this.logger.log(auctions)
        }).catch(error => this.logger.log(error.message));
        // TODO: Retrieve auctions and display aggregated information (see README.md)
    }

}