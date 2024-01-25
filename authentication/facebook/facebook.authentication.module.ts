import { Global, Module } from "@nestjs/common";
import { InjectableToken } from "../../injectable.token.js";
import { FacebookAuthenticationGuard } from "./facebook.authentication.guard.js";


const facebookGuard = {
    provide: InjectableToken.FACEBOOK_GUARD,
    useClass: FacebookAuthenticationGuard
}

@Global()
@Module({
    imports: [],
    providers: [facebookGuard],
    exports: [facebookGuard]
})
export class FacebookAuthenticationModule {}