var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthenticationModule_1;
import { Module } from "@nestjs/common";
import { AuthenticationCoreModule } from "./authentication.core.module.js";
let AuthenticationModule = AuthenticationModule_1 = class AuthenticationModule {
    static forRootAsync(options, withController = false) {
        return {
            module: AuthenticationModule_1,
            imports: [
                AuthenticationCoreModule.forRootAsync(options, withController)
            ]
        };
    }
};
AuthenticationModule = AuthenticationModule_1 = __decorate([
    Module({})
], AuthenticationModule);
export { AuthenticationModule };
//# sourceMappingURL=authentication.module.js.map