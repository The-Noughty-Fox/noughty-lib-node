import { UserDbInterface } from "../injectables/userdb.interface";
import { AppleConfig } from "../injectables/apple.config";
declare const AppleAuthenticationStrategy_base: new (...args: any[]) => any;
export declare class AppleAuthenticationStrategy extends AppleAuthenticationStrategy_base {
    private userDbService;
    private appleConfig;
    constructor(userDbService: UserDbInterface, appleConfig: AppleConfig);
    validate<User>(req: Request, accessToken: string, refreshToken: string, profile: any): Promise<User>;
    private createUser;
}
export {};
