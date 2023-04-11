import {InjectableToken} from "../../injectable.token";
import {FacebookAuthenticationGuard} from "./facebook.authentication.guard";
import {Global, HttpModule, Module} from "@nestjs/common";

const facebookGuard = {
    provide: InjectableToken.FACEBOOK_GUARD,
    useClass: FacebookAuthenticationGuard
}

@Global()
@Module({
    imports: [HttpModule],
    providers: [facebookGuard],
    exports: [facebookGuard]
})
export class FacebookAuthenticationModule {}