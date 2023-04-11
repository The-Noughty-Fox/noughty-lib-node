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
import { AuthGuard } from "@nestjs/passport";
import { Inject, Injectable } from "@nestjs/common";
import { InjectableToken } from "../../injectable.token";
let FacebookAuthenticationGuard = class FacebookAuthenticationGuard extends AuthGuard('facebook') {
    constructor(authParams, facebookGuard) {
        super();
        this.authParams = authParams;
        this.facebookGuard = facebookGuard;
    }
    canActivate(context) {
        const _super = Object.create(null, {
            canActivate: { get: () => super.canActivate }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const req = context.switchToHttp().getRequest();
            let newUser;
            try {
                yield _super.canActivate.call(this, context);
                newUser = req.user;
            }
            catch (_a) { }
            let oldUser;
            try {
                yield this.facebookGuard.canActivate(context);
                oldUser = req.user;
            }
            catch (e) {
                console.log('Apple authentication error: ', e);
                return false;
            }
            if (!oldUser)
                return false;
            if (!newUser || newUser.id == oldUser.id)
                return true;
            req.user = yield this.authParams.userService.link(oldUser, newUser);
            return true;
        });
    }
};
FacebookAuthenticationGuard = __decorate([
    Injectable(),
    __param(0, Inject(InjectableToken.AUTH_PARAMS)),
    __param(1, Inject(InjectableToken.FACEBOOK_GUARD))
], FacebookAuthenticationGuard);
export { FacebookAuthenticationGuard };
//# sourceMappingURL=facebook.authentication.guard.js.map