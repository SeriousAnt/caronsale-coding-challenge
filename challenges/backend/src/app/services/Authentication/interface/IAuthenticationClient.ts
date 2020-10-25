export interface IAuthenticationClient {
    authenticate(): Promise<string>;
}