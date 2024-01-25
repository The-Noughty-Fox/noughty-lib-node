import { Global, Module } from "@nestjs/common";
import { InjectableToken } from "../../injectable.token.js";
import { GoogleAuthenticationGuard } from "./google.authentication.guard.js";


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
