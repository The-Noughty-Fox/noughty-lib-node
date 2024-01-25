import { Global, Module } from "@nestjs/common";
import { InjectableToken } from "../../injectable.token.js";
import { AppleAuthenticationGuard } from "./apple.authentication.guard.js";


const appleGuard = {
    provide: InjectableToken.APPLE_GUARD,
    useClass: AppleAuthenticationGuard
}

@Global()
@Module({
    providers: [appleGuard],
    exports: [appleGuard]
})
export class AppleAuthenticationModule {}