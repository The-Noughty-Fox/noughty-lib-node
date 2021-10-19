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
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { ForbiddenException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from 'passport-custom';
import { InjectableToken } from "../injectable.token";
let CookiesStrategy = class CookiesStrategy extends PassportStrategy(Strategy, 'cookies') {
    constructor(authParams) {
        super();
        this.authParams = authParams;
    }
    validate(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId)
                throw new UnauthorizedException("Session does not contain the userId");
            return this.authParams.userService.findById(req.session.userId);
        });
    }
};
CookiesStrategy = __decorate([
    Injectable(),
    __param(0, Inject(InjectableToken.AUTH_PARAMS))
], CookiesStrategy);
export { CookiesStrategy };
let AuthenticationGuard = class AuthenticationGuard extends AuthGuard('cookies') {
};
AuthenticationGuard = __decorate([
    Injectable()
], AuthenticationGuard);
export { AuthenticationGuard };
let SignedUpGuard = class SignedUpGuard extends AuthGuard('cookies') {
    handleRequest(err, u, info, context, status) {
        const user = super.handleRequest(err, u, info, context, status);
        if (!(user === null || user === void 0 ? void 0 : user.email))
            throw new ForbiddenException("Anonymous users can't access resource");
        return user;
    }
};
SignedUpGuard = __decorate([
    Injectable()
], SignedUpGuard);
export { SignedUpGuard };
//# sourceMappingURL=authentication.guard.js.map