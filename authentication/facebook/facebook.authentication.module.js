var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { InjectableToken } from "../../injectable.token";
import { FacebookAuthenticationGuard } from "./facebook.authentication.guard";
import { Global, Module } from "@nestjs/common";
const facebookGuard = {
    provide: InjectableToken.FACEBOOK_GUARD,
    useClass: FacebookAuthenticationGuard
};
let FacebookAuthenticationModule = class FacebookAuthenticationModule {
};
FacebookAuthenticationModule = __decorate([
    Global(),
    Module({
        providers: [facebookGuard],
        exports: [facebookGuard]
    })
], FacebookAuthenticationModule);
export { FacebookAuthenticationModule };
//# sourceMappingURL=facebook.authentication.module.js.map