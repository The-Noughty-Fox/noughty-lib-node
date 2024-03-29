import { Injectable, CanActivate, Inject, ExecutionContext } from "@nestjs/common";
import axios from "axios";
import { InjectableToken } from "../../injectable.token.js";
import { AuthenticationParams } from "../authentication.module.js";


@Injectable()
export class FacebookAuthenticationGuard implements CanActivate {
    constructor(@Inject(InjectableToken.AUTH_PARAMS) private authParams: AuthenticationParams) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        const {token} = req.body;
        if (!token)
            return Promise.reject(`Facebook authentication requires 'token' be sent in body`)

        const {data} = await axios
            .get<any>(`https://graph.facebook.com/me?access_token=${token}&
                fields=id,name,email,first_name,last_name,gender,picture`)

            req.user = await this.authParams.userService.findBySocialMediaToken("facebook", data.id as string)
                || await this.authParams.userService.findByEmail(data.email)
                || await this.authParams.userService.create({
                    email: data.email || "Unknown",
                    username: `user_${Math.floor(Math.random() * 99999)}`,
                    firstname: data.first_name || 'Unknown',
                    lastname: data.last_name || 'Unknown',
                    gender: data.gender,
                    facebook_token: data.id as string,
                    socialProfilePictureUrl: data.picture.data.url
                });

            return true
    }
}