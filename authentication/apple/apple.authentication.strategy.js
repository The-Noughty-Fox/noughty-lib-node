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
import { Injectable, Inject } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectableToken } from "../../injectable.token.js";
import * as AppleStrategy from "@nicokaiser/passport-apple";
let AppleAuthenticationStrategy = class AppleAuthenticationStrategy extends PassportStrategy(AppleStrategy.Strategy) {
    constructor(authParams) {
        super(Object.assign(Object.assign({}, authParams.appleConfig), { passReqToCallback: true }));
        this.authParams = authParams;
    }
    validate(req, accessToken, refreshToken, profile) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { id, email } = profile;
            if (!id)
                return Promise.reject("Apple jwt token does not contain the 'sub' field.");
            const existingUser = (yield this.authParams.userService.findByAppleToken(id))
                || (yield this.authParams.userService.findBySocialMediaToken("apple", id))
                || (yield this.authParams.userService.findByEmail(email))
                || (yield this.authParams.userService.create({
                    email,
                    username: ((_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.userInfo) === null || _b === void 0 ? void 0 : _b.name.given) || 'Unknown',
                    apple_token: id,
                }));
            return existingUser;
        });
    }
};
AppleAuthenticationStrategy = __decorate([
    Injectable(),
    __param(0, Inject(InjectableToken.AUTH_PARAMS))
], AppleAuthenticationStrategy);
export { AppleAuthenticationStrategy };
//# sourceMappingURL=apple.authentication.strategy.js.map