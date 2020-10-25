import { Container } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { Logger } from "./services/Logger/classes/Logger";
import { AuctionMonitorApp } from "./AuctionMonitorApp";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import { IConfig } from "./services/Configuration/interface/IConfig";
import { Config } from "./services/Configuration/classes/config";
import { IAuthenticationClient } from "./services/Authentication/interface/IAuthenticationClient";
import { AuthenticationClient } from "./services/Authentication/classes/AuthenticationClient";

/*
 * Create the DI container.
 */
const container = new Container({
    defaultScope: "Singleton",
});

/*
 * Register dependencies in DI environment.
 */
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
container.bind<IConfig>(DependencyIdentifier.CONFIG).to(Config);
container.bind<IAuthenticationClient>(DependencyIdentifier.AUTH).to(AuthenticationClient);



/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp);

/*
 * Start the application
 */
(async () => {
    await app.start();
})();
