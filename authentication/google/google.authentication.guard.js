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
import { InjectableToken } from "../../injectable.token";
import { OAuth2Client } from "google-auth-library";
let GoogleAuthenticationGuard = class GoogleAuthenticationGuard {
    constructor(authParams) {
        this.authParams = authParams;
        this.client = new OAuth2Client(authParams.googleConfig.clientID);
    }
    canActivate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = context.switchToHttp().getRequest();
            const { token } = req.body;
            if (!token)
                return Promise.reject(`Google authentication requires 'token' be sent in body`);
            const ticket = yield this.client.verifyIdToken({
                idToken: token,
                audience: this.authParams.googleConfig.audience
            });
            const { given_name: name, sub: id, email } = ticket.getPayload();
            req.user = (yield this.authParams.userService.findByGoogleToken(id))
                || (yield this.authParams.userService.findByEmail(email))
                || (yield this.authParams.userService.create({ email, username: name, google_token: id }));
            return true;
        });
    }
};
GoogleAuthenticationGuard = __decorate([
    Injectable(),
    __param(0, Inject(InjectableToken.AUTH_PARAMS))
], GoogleAuthenticationGuard);
export { GoogleAuthenticationGuard };
//# sourceMappingURL=google.authentication.guard.js.map