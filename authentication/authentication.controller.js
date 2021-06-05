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
import { Controller, Post, UseGuards, UsePipes, Req } from "@nestjs/common";
import { AppleAuthenticationGuard } from "./apple/apple.authentication.guard";
let AuthenticationController = class AuthenticationController {
    authenticate(req) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session = { id: req.user.id };
            return req.user;
        });
    }
    // @UseGuards(AppleAuthenticationGuard)
    authenticateTest(req) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session = {
                "token": "123456",
                "userId": 1
            };
            return req.session;
        });
    }
};
__decorate([
    UseGuards(AppleAuthenticationGuard),
    UsePipes(),
    Post('apple'),
    __param(0, Req())
], AuthenticationController.prototype, "authenticate", null);
__decorate([
    UsePipes(),
    Post('apple_test'),
    __param(0, Req())
], AuthenticationController.prototype, "authenticateTest", null);
AuthenticationController = __decorate([
    Controller('auth')
], AuthenticationController);
export { AuthenticationController };
//# sourceMappingURL=authentication.controller.js.map