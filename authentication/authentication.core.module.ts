import {DynamicModule, Module, RequestMethod} from "@nestjs/common";
import {AuthenticationController} from "./authentication.controller";
import {InjectableToken} from "../injectable.token";
import {PassportModule} from "@nestjs/passport";
import {CookieSessionModule, NestCookieSessionOptions} from "nestjs-cookie-session";
import {AppleAuthenticationStrategy} from "./apple/apple.authentication.strategy";
import {CookiesStrategy} from "./authentication.guard";
import {AuthenticationOptions, AuthenticationParams} from "./authentication.module";

@Module({

})
export class AuthenticationParamsModule {
    static forRootAsync(options: AuthenticationOptions): DynamicModule {
        const authParamsProvider = {
            provide: InjectableToken.AUTH_PARAMS,
            useFactory: options.useFactory,
            inject: options.inject || []
        }
        return {
            module: AuthenticationParamsModule,
            imports: [...options.imports],
            providers: [authParamsProvider],
            exports: [authParamsProvider]
        }
    }
}

@Module({
    controllers: [AuthenticationController]
})
export class AuthenticationCoreModule {
    static forRootAsync(options: AuthenticationOptions): DynamicModule {
        return {
            module: AuthenticationCoreModule,
            imports: [
                ...options.imports,
                AuthenticationParamsModule.forRootAsync(options),
                PassportModule.register({ session: true }),
                CookieSessionModule.forRootAsync({
                    imports: [AuthenticationParamsModule.forRootAsync(options)],
                    inject: [InjectableToken.AUTH_PARAMS],
                    useFactory: async (authParams: AuthenticationParams): Promise<NestCookieSessionOptions> => {
                        return {
                            session: { secret: authParams.secret },
                            exclude: [
                                { path: 'apple/auth', method: RequestMethod.POST }
                            ]
                        }
                    }
                })
            ],
            providers: [
                AppleAuthenticationStrategy,
                CookiesStrategy
            ],
        }
    }
}