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
import axios from "axios";
import { InjectableToken } from "../../injectable.token.js";
let FacebookAuthenticationGuard = class FacebookAuthenticationGuard {
    constructor(authParams) {
        this.authParams = authParams;
    }
    canActivate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = context.switchToHttp().getRequest();
            const { token } = req.body;
            if (!token)
                return Promise.reject(`Facebook authentication requires 'token' be sent in body`);
            const { data } = yield axios
                .get(`https://graph.facebook.com/me?access_token=${token}&
                fields=id,name,email,first_name,last_name,gender,picture`);
            req.user = (yield this.authParams.userService.findBySocialMediaToken("facebook", data.id))
                || (yield this.authParams.userService.findByEmail(data.email))
                || (yield this.authParams.userService.create({
                    email: data.email || "Unknown",
                    username: `user_${Math.floor(Math.random() * 99999)}`,
                    firstname: data.first_name || 'Unknown',
                    lastname: data.last_name || 'Unknown',
                    gender: data.gender,
                    facebook_token: data.id,
                    socialProfilePictureUrl: data.picture.data.url
                }));
            return true;
        });
    }
};
FacebookAuthenticationGuard = __decorate([
    Injectable(),
    __param(0, Inject(InjectableToken.AUTH_PARAMS))
], FacebookAuthenticationGuard);
export { FacebookAuthenticationGuard };
//# sourceMappingURL=facebook.authentication.guard.js.map