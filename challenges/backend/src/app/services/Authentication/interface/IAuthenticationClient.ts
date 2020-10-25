import { IAuthenticationResponse } from '../classes/AuthenticationClient';
export interface IAuthenticationClient {
    authenticate(): Promise<IAuthenticationResponse>;
}