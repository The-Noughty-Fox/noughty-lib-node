import { Request } from "express";
import { Strategy } from 'passport-custom';
import { UserDbInterface } from "./injectables/userdb.interface";
declare const CookiesStrategy_base: new (...args: any[]) => Strategy;
export declare class CookiesStrategy extends CookiesStrategy_base {
    private userDbService;
    constructor(userDbService: UserDbInterface);
    validate<User>(req: Request): Promise<User>;
}
declare const AuthenticationGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AuthenticationGuard extends AuthenticationGuard_base {
}
export {};
