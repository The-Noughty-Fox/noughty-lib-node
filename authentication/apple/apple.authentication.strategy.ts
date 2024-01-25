import { Injectable, Inject } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectableToken } from "../../injectable.token.js";
import { AuthenticationParams } from "../authentication.module.js";
import * as AppleStrategy from "@nicokaiser/passport-apple";

@Injectable()
export class AppleAuthenticationStrategy extends PassportStrategy(AppleStrategy.Strategy) {

    constructor(
        @Inject(InjectableToken.AUTH_PARAMS) private authParams: AuthenticationParams
    ) {
        super({...authParams.appleConfig, passReqToCallback: true})
    }

    async validate<User>(req: any, accessToken: string, refreshToken: string, profile: any): Promise<User> {
        const {id, email} = profile

        if (!id) return Promise.reject("Apple jwt token does not contain the 'sub' field.")

        const existingUser = await this.authParams.userService.findByAppleToken(id as string)
            || await this.authParams.userService.findBySocialMediaToken("apple", id as string)
            || await this.authParams.userService.findByEmail(email)
            || await this.authParams.userService.create({
            email,
            username: (req.body as any)?.userInfo?.name.given || 'Unknown',
            apple_token: id,
        })

        return existingUser;
    }
}