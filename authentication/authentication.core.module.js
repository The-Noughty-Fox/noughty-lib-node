var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var AuthenticationParamsModule_1, AuthenticationCoreModule_1;
import { Global, Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication.controller";
import { InjectableToken } from "../injectable.token";
import { PassportModule } from "@nestjs/passport";
import { CookieSessionModule } from "nestjs-cookie-session";
import { AppleAuthenticationStrategy } from "./apple/apple.authentication.strategy";
import { CookiesStrategy } from "./authentication.guard";
import { AnonymousAppleAuthenticationGuard } from "./apple/apple.authentication.guard";
import { AppleAuthenticationModule } from "./apple/apple.authentication.module";
import { GoogleAuthenticationModule } from "./google/google.authentication.module";
import { FacebookAuthenticationModule } from "./facebook/facebook.authentication.module";
class SIWAMiddleware {
    use(req, res, next) {
        const body = req.body;
        body.code = body.authorizationCode;
        next();
    }
}
let AuthenticationParamsModule = AuthenticationParamsModule_1 = class AuthenticationParamsModule {
    static forRootAsync(options) {
        const authParamsProvider = {
            provide: InjectableToken.AUTH_PARAMS,
            useFactory: options.useFactory,
            inject: options.inject || []
        };
        return {
            module: AuthenticationParamsModule_1,
            imports: [...options.imports],
            providers: [authParamsProvider],
            exports: [authParamsProvider]
        };
    }
};
AuthenticationParamsModule = AuthenticationParamsModule_1 = __decorate([
    Global(),
    Module({})
], AuthenticationParamsModule);
export { AuthenticationParamsModule };
let AuthenticationCoreModule = AuthenticationCoreModule_1 = class AuthenticationCoreModule {
    static forRootAsync(options, withController = false) {
        return {
            controllers: withController ? [AuthenticationController] : [],
            module: AuthenticationCoreModule_1,
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
                    useFactory: (authParams) => __awaiter(this, void 0, void 0, function* () {
                        return {
                            session: {
                                secret: authParams.secret,
                                maxAge: 1000 * 3600 * 24 * 365
                            }
                        };
                    })
                })
            ],
            providers: [
                AppleAuthenticationStrategy,
                AnonymousAppleAuthenticationGuard,
                CookiesStrategy
            ]
        };
    }
    configure(consumer) {
        consumer
            .apply(SIWAMiddleware)
            .forRoutes('auth/apple');
    }
};
AuthenticationCoreModule = AuthenticationCoreModule_1 = __decorate([
    Module({})
], AuthenticationCoreModule);
export { AuthenticationCoreModule };
//# sourceMappingURL=authentication.core.module.js.map