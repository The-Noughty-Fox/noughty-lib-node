import {InjectableToken} from "../../injectable.token";
import {AppleAuthenticationGuard} from "./apple.authentication.guard";
import {Global, Module} from "@nestjs/common";

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