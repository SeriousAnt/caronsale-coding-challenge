export interface IAuthenticationClient {
    authenticate(): Promise<any>;
}