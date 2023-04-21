import {CanActivate, ExecutionContext, Inject, Injectable} from "@nestjs/common";
import {InjectableToken} from "../../injectable.token";
import {AuthenticationParams} from "../authentication.module";
import axios from "axios";

@Injectable()
export class FacebookAuthenticationGuard implements CanActivate {
    constructor(@Inject(InjectableToken.AUTH_PARAMS) private authParams: AuthenticationParams) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        const {token} = req.body;
        if (!token)
            return Promise.reject(`Facebook authentication requires 'token' be sent in body`)

        const {data} = await axios
            .get<any>(`https://graph.facebook.com/me?access_token=${token}`)

        const {name, emails, id} = data;
        const email = emails ? emails[0].value : "";

        req.user = await this.authParams.userService.findByFacebookToken(id as string)
            || await this.authParams.userService.findByEmail(email)
            || await this.authParams.userService.create({
                email,
                username: name.givenName || `user_${Math.floor(Math.random() * 99999)}`,
                firstname: name.familyName || 'Unknown',
                lastname: name.givenName || 'Unknown',
                facebook_token: id,
            });

        return true
    }
}