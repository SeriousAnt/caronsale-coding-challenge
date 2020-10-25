import { IAuction } from "../classes/CarOnSaleClient";

/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export interface ICarOnSaleClient {

    getRunningAuctions(): Promise<IAuction[]>
    printAuctionsOverview(auctions: IAuction[]): void;

}