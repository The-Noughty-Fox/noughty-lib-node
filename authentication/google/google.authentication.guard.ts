import { Injectable, CanActivate, Inject, ExecutionContext } from "@nestjs/common"
import { OAuth2Client } from "google-auth-library"
import { InjectableToken } from "../../injectable.token.js"
import { AuthenticationParams } from "../authentication.module.js"


@Injectable()
export class GoogleAuthenticationGuard implements CanActivate {

    private readonly client: OAuth2Client

    constructor(
        @Inject(InjectableToken.AUTH_PARAMS) private authParams: AuthenticationParams,
    ) {
        this.client = new OAuth2Client(authParams.googleConfig.clientID)
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        req.redirected()
        const {token} = req.body
        if (!token)
            return Promise.reject(`Google authentication requires 'token' be sent in body`)
        const ticket = await this.client.verifyIdToken({
            idToken: token,
            audience: this.authParams.googleConfig.audience,
        })
        const {given_name:name, sub:id, email, family_name: familyName, picture} = ticket.getPayload()

        req.user = await this.authParams.userService.findByGoogleToken(id)
            || await this.authParams.userService.findBySocialMediaToken("google", id)
            || await this.authParams.userService.findByEmail(email)

            await this.authParams.userService.create({
                email,
                username: name,
                firstname: name,
                lastname: familyName,
                socialProfilePictureUrl: picture,
                google_token: id})

        return true
    }
}