export class AuctionsReport {

    public static calculateAuctionCompletion(auction: IAuction): number {
        if (!auction.minimumRequiredAsk) { auction.minimumRequiredAsk = 0 };
        if (!auction.currentHighestBidValue || auction.currentHighestBidValue === 0) { return 0 };
        return auction.minimumRequiredAsk > auction.currentHighestBidValue ? auction.currentHighestBidValue / auction.currentHighestBidValue : 1;
    }

    public static calculateAuctionCompletionAverage(auctions: IAuction[]): number {
        return auctions.map(this.calculateAuctionCompletion).reduce((p, c) => p + c, 0) / auctions.length;
    }

    public static calculateNumberOfBidsAverage(auctions: IAuction[]): number {
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