export class Config {
    private static _config: Config;

    public readonly apiEndpoint = 'https://caronsale-backend-service-dev.herokuapp.com/api/v1';
    public readonly apiUser = 'salesman@random.com';
    public readonly apiPassword = '123test';

    public static instance(): Config {
        if (!this._config || this._config === undefined) {
            this._config = new Config();
        }
        return this._config;
    }
}