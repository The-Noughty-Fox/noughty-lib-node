import {DynamicModule, Global, MiddlewareConsumer, Module, NestMiddleware, RequestMethod} from "@nestjs/common";
import {AuthenticationController} from "./authentication.controller";
import {InjectableToken} from "../injectable.token";
import {PassportModule} from "@nestjs/passport";
import {CookieSessionModule, NestCookieSessionOptions} from "nestjs-cookie-session";
import {AppleAuthenticationStrategy} from "./apple/apple.authentication.strategy";
import {CookiesStrategy} from "./authentication.guard";
import {AuthenticationOptions, AuthenticationParams} from "./authentication.module";
import {Request, Response, NextFunction} from "express";
import {AnonymousAppleAuthenticationGuard} from "./apple/apple.authentication.guard";
import {AppleAuthenticationModule} from "./apple/apple.authentication.module";
import {GoogleAuthenticationModule} from "./google/google.authentication.module";
import {FacebookAuthenticationModule} from "./facebook/facebook.authentication.module";

class SIWAMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const body = req.body as any;
        body.code = body.authorizationCode;
        next();
    }
}

@Global()
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

@Module({})
export class AuthenticationCoreModule {
    static forRootAsync(options: AuthenticationOptions, withController: boolean = false): DynamicModule {
        return {
            
            controllers: withController ? [AuthenticationController] : [],
            module: AuthenticationCoreModule,
            imports: [
                ...options.imports,
                AuthenticationParamsModule.forRootAsync(options),
                AppleAuthenticationModule,
                FacebookAuthenticationModule,
                GoogleAuthenticationModule,
                PassportModule.register({ session: true }),
                CookieSessionModule.forRootAsync({
                    imports: [AuthenticationParamsModule.forRootAsync(options).module],
                    inject: [InjectableToken.AUTH_PARAMS],
                    useFactory: async (authParams: AuthenticationParams): Promise<NestCookieSessionOptions> => {
                        return {
                            session: {
                                secret: authParams.secret,
                                maxAge: 1000 * 3600 * 24 * 365
                            }
                        }
                    }
                })
            ],
            providers: [
                AppleAuthenticationStrategy,
                AnonymousAppleAuthenticationGuard,
                CookiesStrategy
            ]
        }
    }

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(SIWAMiddleware)
            .forRoutes('auth/apple')
    }
}