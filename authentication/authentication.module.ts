import {DynamicModule, Module, RequestMethod} from "@nestjs/common";
import {CookieSessionModule, NestCookieSessionOptions} from "nestjs-cookie-session";
import {PassportModule} from "@nestjs/passport";
import {CookiesStrategy} from "./authentication.guard";
import {AuthenticationController} from "./authentication.controller";
import {UserDbInterface} from "./injectables/userdb.interface";
import {AppleConfig} from "./injectables/apple.config";
import {InjectableToken} from "../injectable.token";
import {AppleAuthenticationStrategy} from "./apple/apple.authentication.strategy";
import {ModuleMetadata} from "@nestjs/common/interfaces";
import {AuthenticationCoreModule} from "./authentication.core.module";

export interface AuthenticationOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[]) => AuthenticationParams
    inject?: any[]
}

export interface AuthenticationParams {
    secret: string
    userService: UserDbInterface
    appleConfig: AppleConfig
}

@Module({})
export class AuthenticationModule {
    static forRootAsync(options: AuthenticationOptions): DynamicModule {
        return {
            module: AuthenticationModule,
            imports: [
                AuthenticationCoreModule.forRootAsync(options)
            ]
        }
    }
}