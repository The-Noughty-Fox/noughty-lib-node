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
import { Controller, Post, UseGuards, Req, Inject, Param, ParseIntPipe, BadRequestException } from "@nestjs/common";
import { AppleAuthenticationGuard } from "./apple/apple.authentication.guard";
import { InjectableToken } from "../injectable.token";
import { CreateUserDto } from "./dto/createuser.dto";
let AuthenticationController = class AuthenticationController {
    constructor(authParams) {
        this.authParams = authParams;
    }
    authenticate(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user && req.user.id) {
                req.session = { userId: req.user.id };
                return this.authParams.userService.map(req.user);
            }
            return Promise.reject('Authentication failed');
        });
    }
    loginTest(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.authParams.userService.findById(id);
            if (!user)
                throw new BadRequestException(`User with id ${id} does not exist`);
            req.session = { userId: id };
            return this.authParams.userService.map(user);
        });
    }
    createAnonymous(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = new CreateUserDto();
            const names = ['Hiker', 'Walkr', 'Guru', 'Rider', 'Pal', 'Doodee'];
            dto.username = `Noughty${names[~~(Math.random() * names.length)]}`;
            const user = yield this.authParams.userService.create(dto);
            req.session = { userId: user.id };
            return this.authParams.userService.map(user);
        });
    }
};
__decorate([
    UseGuards(AppleAuthenticationGuard),
    Post('apple'),
    __param(0, Req())
], AuthenticationController.prototype, "authenticate", null);
__decorate([
    Post('test/:id'),
    __param(0, Req()), __param(1, Param('id', ParseIntPipe))
], AuthenticationController.prototype, "loginTest", null);
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