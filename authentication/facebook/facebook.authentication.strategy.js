var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import * as FacebookStrategy from "passport-facebook";
import { InjectableToken } from "../../injectable.token";
let FacebookAuthenticationStrategy = class FacebookAuthenticationStrategy extends PassportStrategy(FacebookStrategy.Strategy) {
    constructor(authParams) {
        super(Object.assign({}, authParams.facebookConfig));
        this.authParams = authParams;
    }
    validate(accessToken, refreshToken, profile, done) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, emails } = profile;
            const user = {
                email: emails[0].value,
                firstName: name.givenName,
                lastName: name.familyName,
            };
            const payload = {
                user,
                accessToken,
            };
            done(null, payload);
        });
    }
};
FacebookAuthenticationStrategy = __decorate([
    Injectable(),
    __param(0, Inject(InjectableToken.AUTH_PARAMS))
], FacebookAuthenticationStrategy);
export { FacebookAuthenticationStrategy };
//# sourceMappingURL=facebook.authentication.strategy.js.map