import {AuthGuard, PassportStrategy} from "@nestjs/passport";
import { ForbiddenException, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {Request} from "express";
import {Strategy} from 'passport-custom';
import {InjectableToken} from "../injectable.token";
import {AuthenticationParams} from "./authentication.module";

@Injectable()
export class CookiesStrategy extends PassportStrategy(Strategy, 'cookies') {

    constructor(
        @Inject(InjectableToken.AUTH_PARAMS) private authParams: AuthenticationParams) {
        super();
    }

    async validate<User>(req: Request): Promise<User> {
        if (!req.session.userId) throw new UnauthorizedException("Session does not contain the userId");
        return this.authParams.userService.findById(req.session.userId)
    }
}

@Injectable()
export class AuthenticationGuard extends AuthGuard('cookies') {}

@Injectable()
export class SignedUpGuard extends AuthGuard('cookies') {
    handleRequest(err, u, info, context, status) {
        const user = super.handleRequest(err, u, info, context, status)
        if (!user?.email) throw new ForbiddenException("Anonymous users can't access resource")
        return user
    }
}
