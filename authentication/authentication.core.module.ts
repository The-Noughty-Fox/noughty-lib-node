import {DynamicModule, MiddlewareConsumer, Module, NestMiddleware, RequestMethod} from "@nestjs/common";
import {AuthenticationController} from "./authentication.controller";
import {InjectableToken} from "../injectable.token";
import {PassportModule} from "@nestjs/passport";
import {CookieSessionModule, NestCookieSessionOptions} from "nestjs-cookie-session";
import {AppleAuthenticationStrategy} from "./apple/apple.authentication.strategy";
import {CookiesStrategy} from "./authentication.guard";
import {AuthenticationOptions, AuthenticationParams} from "./authentication.module";
import {Request, Response, NextFunction} from "express";
import {AppleAuthenticationGuard} from "./apple/apple.authentication.guard";

class SIWAMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const body = req.body as any;
        body.code = body.authorizationCode;
        next();
    }
}

@Module({})
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
                            session: { secret: authParams.secret }
                        }
                    }
                })
            ],
            providers: [
                AppleAuthenticationStrategy,
                AppleAuthenticationGuard,
                CookiesStrategy
            ],
        }
    }

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(SIWAMiddleware)
            .forRoutes('auth/apple')
    }
}