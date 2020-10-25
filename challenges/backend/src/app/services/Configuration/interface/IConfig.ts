import { Config } from "../../CarOnSaleClient/classes/config";

export interface IConfig {
    readonly apiEndpoint: string;
    readonly apiUser: string;
    readonly apiPassword: string;
    readonly apiPasswordHashCycles: number;
}