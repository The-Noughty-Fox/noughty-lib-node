import {ExecutionContext, Inject, Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {InjectableToken} from "../../injectable.token";
import {AuthenticationParams} from "../authentication.module";

@Injectable()
export class AppleAuthenticationGuard extends AuthGuard('apple') {}

@Injectable()
export class AnonymousAppleAuthenticationGuard extends AuthGuard('cookies') {
    constructor(
        @Inject(InjectableToken.AUTH_PARAMS) private authParams: AuthenticationParams,
        @Inject(InjectableToken.APPLE_GUARD) private readonly appleGuard: AppleAuthenticationGuard
    ) {
        super()
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()

        let newUser: any
        try {
            await super.canActivate(context)
            newUser = req.user
        } catch { }

        let oldUser: any
        try {
            await this.appleGuard.canActivate(context)
            oldUser = req.user
        } catch (e) {
            console.log('Apple authentication error: ', e)
            return false
        }
        if (!oldUser) return false
        if (!newUser || newUser.id == oldUser.id) return true

        req.user = await this.authParams.userService.link(oldUser, newUser)

        return true
    }
}
