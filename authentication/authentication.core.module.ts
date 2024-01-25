import { NestMiddleware, Global, Module, DynamicModule, MiddlewareConsumer } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { NextFunction } from "express";
import { CookieSessionModule, NestCookieSessionOptions } from "nestjs-cookie-session";
import { InjectableToken } from "../injectable.token.js";
import { AnonymousAppleAuthenticationGuard } from "./apple/apple.authentication.guard.js";
import { AppleAuthenticationModule } from "./apple/apple.authentication.module.js";
import { AppleAuthenticationStrategy } from "./apple/apple.authentication.strategy.js";
import { AuthenticationController } from "./authentication.controller.js";
import { CookiesStrategy } from "./authentication.guard.js";
import { AuthenticationOptions, AuthenticationParams } from "./authentication.module.js";
import { FacebookAuthenticationModule } from "./facebook/facebook.authentication.module.js";
import { GoogleAuthenticationModule } from "./google/google.authentication.module.js";


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
                FacebookAuthenticationModule,
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