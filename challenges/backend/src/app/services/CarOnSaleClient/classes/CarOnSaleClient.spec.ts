import 'reflect-metadata';

import { Container, injectable } from 'inversify'
import { describe, it } from 'mocha'
import { DependencyIdentifier } from '../../../DependencyIdentifiers'
import { AuthenticationClient, IAuthenticationResponse } from '../../Authentication/classes/AuthenticationClient'
import { IAuthenticationClient } from '../../Authentication/interface/IAuthenticationClient'
import { Config } from '../../Configuration/classes/config'
import { IConfig } from '../../Configuration/interface/IConfig'
import { ILogger } from '../../Logger/interface/ILogger'
import { CarOnSaleClient } from './CarOnSaleClient'
import { expect } from 'chai';
import { ICarOnSaleClient } from '../interface/ICarOnSaleClient';

@injectable()
class AuthenticactionMockClient implements IAuthenticationClient {
    public authenticate(): Promise<IAuthenticationResponse> {
        return Promise.resolve({
            authenticated: true,
            internalUserId: 1,
            internalUserUUID: '123-uuid-234-567',
            privileges: '',
            type: 1,
            token: 'super-secret-token',
            userId: 'salesman@random.com',
        });
    }
}

// tslint:disable-next-line: max-classes-per-file
@injectable()
class MockLogger implements ILogger {
    public log(): void { };
}

describe('CarOnSaleClientTest - Testing client functionality by dependency injection', () => {

    let client;
    let container: Container;
    beforeEach(() => {
        container = new Container({
            defaultScope: 'Singleton',
        });

        // register dependencies
        container.bind<ILogger>(DependencyIdentifier.LOGGER).to(MockLogger);
        container.bind<IConfig>(DependencyIdentifier.CONFIG).to(Config);
    });

    it('will try to authenticate vs. CoS API with mocked auth client token and fail with an unauthorized error', (done) => {
        container.bind<IAuthenticationClient>(DependencyIdentifier.AUTH).to(AuthenticactionMockClient);
        client = container.resolve<ICarOnSaleClient>(CarOnSaleClient);
        client.getRunningAuctions().catch((error) => {
            expect(error).not.to.be.null;
            expect(error.status).to.be.eq(401);
            done();
        });
    });

    it('will try to authenticate vs. CoS API and retrieve running auctions', (done) => {
        container.bind<IAuthenticationClient>(DependencyIdentifier.AUTH).to(AuthenticationClient);
        client = container.resolve<ICarOnSaleClient>(CarOnSaleClient);
        client.getRunningAuctions().then((auctions) => {
            expect(auctions).not.to.be.null;
            done();
        });
    });
})
