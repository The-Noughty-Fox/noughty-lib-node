import {InjectableToken} from "../../injectable.token";
import {GoogleAuthenticationGuard} from "./google.authentication.guard";
import {Global, Module} from "@nestjs/common";

const googleGuard = {
    provide: InjectableToken.GOOGLE_GUARD,
    useClass: GoogleAuthenticationGuard
}

@Global()
@Module({
    providers: [googleGuard],
    exports: [googleGuard]
})
export class GoogleAuthenticationModule {}
