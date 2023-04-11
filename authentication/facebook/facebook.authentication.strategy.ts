import {Inject, Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import * as FacebookStrategy from "passport-facebook"
import {InjectableToken} from "../../injectable.token";
import {AuthenticationParams} from "../authentication.module";
import {Profile} from "passport-facebook";
import {FacebookAuthDto} from "../dto/facebook.auth.dto";

@Injectable()
export class FacebookAuthenticationStrategy extends PassportStrategy(FacebookStrategy.Strategy) {
    constructor(@Inject(InjectableToken.AUTH_PARAMS) private authParams: AuthenticationParams) {
        super({...authParams.facebookConfig});
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (err: any, user: FacebookAuthDto, info?: any) => void
    ): Promise<any> {
        const { name, emails } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
        };
        const payload = {
            user,
            accessToken,
        };

        done(null, payload);
    }
}
