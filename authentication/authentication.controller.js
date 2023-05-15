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
import { Controller, Post, UseGuards, Req, Inject } from "@nestjs/common";
import { AnonymousAppleAuthenticationGuard } from "./apple/apple.authentication.guard";
import { InjectableToken } from "../injectable.token";
import { GoogleAuthenticationGuard } from "./google/google.authentication.guard";
import { FacebookAuthenticationGuard } from "./facebook/facebook.authentication.guard";
let AuthenticationController = class AuthenticationController {
    constructor(authParams) {
        this.authParams = authParams;
    }
    authenticateApple(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user && req.user.id) {
                req.session = { userId: req.user.id };
                return this.authParams.userService.map(req.user);
            }
            return Promise.reject('Apple authentication failed');
        });
    }
    authenticateGoogle(req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) {
                req.session = { userId: req.user.id };
                return this.authParams.userService.map(req.user);
            }
            return Promise.reject('Google authentication failed');
        });
    }
    authenticateWithFacebookPo(req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) {
                req.session = { userId: req.user.id };
                return req.user;
            }
            return Promise.reject('Facebook authentication failed');
        });
    }
    createAnonymous(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const names = ['Hiker', 'Walkr', 'Guru', 'Rider', 'Pal', 'Doodee'];
            const user = yield this.authParams.userService.create({
                username: `Noughty${names[~~(Math.random() * names.length)]}`
            });
            req.session = { userId: user.id };
            return this.authParams.userService.map(user);
        });
    }
};
__decorate([
    UseGuards(AnonymousAppleAuthenticationGuard),
    Post('apple'),
    __param(0, Req())
], AuthenticationController.prototype, "authenticateApple", null);
__decorate([
    UseGuards(GoogleAuthenticationGuard),
    Post('google'),
    __param(0, Req())
], AuthenticationController.prototype, "authenticateGoogle", null);
__decorate([
    UseGuards(FacebookAuthenticationGuard),
    Post('facebook'),
    __param(0, Req())
], AuthenticationController.prototype, "authenticateWithFacebookPo", null);
__decorate([
    Post('anonymous'),
    __param(0, Req())
], AuthenticationController.prototype, "createAnonymous", null);
AuthenticationController = __decorate([
    Controller('auth'),
    __param(0, Inject(InjectableToken.AUTH_PARAMS))
], AuthenticationController);
export { AuthenticationController };
//# sourceMappingURL=authentication.controller.js.map