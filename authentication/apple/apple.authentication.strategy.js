var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import * as AppleStrategy from "@nicokaiser/passport-apple";
import { InjectableToken } from "../../injectable.token";
import { CreateUserDto } from "../dto/createuser.dto";
let AppleAuthenticationStrategy = class AppleAuthenticationStrategy extends PassportStrategy(AppleStrategy.Strategy) {
    constructor(authParams) {
        super(Object.assign(Object.assign({}, authParams.appleConfig), { passReqToCallback: true }));
        this.authParams = authParams;
    }
    validate(req, accessToken, refreshToken, profile) {
        if (!profile.id)
            return Promise.reject("Apple jwt token does not contain the 'sub' field.");
        return this.authParams.userService.findByAppleToken(profile.id)
            .then((user) => {
            if (user)
                return user;
            return this.createUser(profile, req.body.userInfo);
        });
    }
    createUser(profile, userInfo) {
        const { id, email } = profile;
        const dto = new CreateUserDto();
        dto.email = email;
        dto.apple_token = id;
        dto.username = (userInfo === null || userInfo === void 0 ? void 0 : userInfo.name.given) || 'Unknown';
        return this.authParams.userService.create(dto);
    }
};
AppleAuthenticationStrategy = __decorate([
    Injectable(),
    __param(0, Inject(InjectableToken.AUTH_PARAMS))
], AppleAuthenticationStrategy);
export { AppleAuthenticationStrategy };
//# sourceMappingURL=apple.authentication.strategy.js.map