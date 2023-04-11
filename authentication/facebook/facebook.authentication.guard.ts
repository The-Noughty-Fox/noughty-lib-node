import {CanActivate, ExecutionContext, HttpService, Inject, Injectable} from "@nestjs/common";
import {InjectableToken} from "../../injectable.token";
import {AuthenticationParams} from "../authentication.module";

@Injectable()
export class FacebookAuthenticationGuard implements CanActivate {
    constructor(private readonly httpService: HttpService,
                @Inject(InjectableToken.AUTH_PARAMS) private authParams: AuthenticationParams) {
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        const {token} = req.body;
        if (!token)
            return Promise.reject(`Facebook authentication requires 'token' be sent in body`)

        const fbResult = await this.httpService
            .get<any>(`https://graph.facebook.com/me?access_token=${token}`)
            .toPromise();

        const {name, emails, id} = fbResult.data;

        req.user = await this.authParams.userService.findByFacebookToken(id as string)
            || await this.authParams.userService.findByEmail(emails[0].value)
            || await this.authParams.userService.create({
                email: emails[0].value,
                username: name.givenName || 'Unknown',
                firstname: name.familyName,
                lastname: name.givenName,
                facebook_token: token,
            });

        return true
    }
}