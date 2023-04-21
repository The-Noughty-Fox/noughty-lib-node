import {InjectableToken} from "../../injectable.token";
import {FacebookAuthenticationGuard} from "./facebook.authentication.guard";
import {Global, Module} from "@nestjs/common";

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