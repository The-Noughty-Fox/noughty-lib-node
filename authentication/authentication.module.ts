import {DynamicModule, MiddlewareConsumer, Module, NestMiddleware, RequestMethod} from "@nestjs/common";
import {ModuleMetadata} from "@nestjs/common/interfaces";
import { AuthenticationCoreModule } from "./authentication.core.module.js";
import { AppleConfig } from "./injectables/apple.config.js";
import { FacebookConfig } from "./injectables/facebook.config.js";
import { GoogleConfig } from "./injectables/google.config.js";
import { IUserService } from "./injectables/user.service.interface.js";

export interface AuthenticationOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[]) => AuthenticationParams
    inject?: any[]
}

export interface AuthenticationParams {
    secret: string
    appleConfig: AppleConfig
    googleConfig: GoogleConfig
    facebookConfig: FacebookConfig
    userService: IUserService
}

@Module({})
export class AuthenticationModule {
    static forRootAsync(options: AuthenticationOptions, withController: boolean = false): DynamicModule {
        return {
            module: AuthenticationModule,
            imports: [
                AuthenticationCoreModule.forRootAsync(options, withController)
            ]
        }
    }
}