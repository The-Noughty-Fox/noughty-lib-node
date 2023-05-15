import {
    Controller,
    Post,
    UseGuards,
    Req, Inject, Param, ParseIntPipe, BadRequestException, NotFoundException, Get, HttpStatus
} from "@nestjs/common";
import {AnonymousAppleAuthenticationGuard} from "./apple/apple.authentication.guard";
import {InjectableToken} from "../injectable.token";
import {AuthenticationParams} from "./authentication.module";
import {GoogleAuthenticationGuard} from "./google/google.authentication.guard";
import {FacebookAuthenticationGuard} from "./facebook/facebook.authentication.guard";

@Controller('auth')
export class AuthenticationController<User> {

    constructor(
        @Inject(InjectableToken.AUTH_PARAMS)
        private authParams: AuthenticationParams
    ) {}

    @UseGuards(AnonymousAppleAuthenticationGuard)
    @Post('apple')
    async authenticateApple(@Req() req): Promise<User> {
        if (req.user && req.user.id) {
            req.session = { userId: req.user.id }
            return this.authParams.userService.map(req.user)
        }
        return Promise.reject('Apple authentication failed')
    }

    @UseGuards(GoogleAuthenticationGuard)
    @Post('google')
    async authenticateGoogle(@Req() req): Promise<User> {
        if (req.user?.id) {
            req.session = { userId: req.user.id }
            return this.authParams.userService.map(req.user)
        }
        return Promise.reject('Google authentication failed')
    }

    @UseGuards(FacebookAuthenticationGuard)
    @Post('facebook')
    async authenticateWithFacebookPo(@Req() req): Promise<User> {
        if (req.user?.id) {
            req.session = { userId: req.user.id }
            return req.user;
        }
        return Promise.reject('Facebook authentication failed')
    }

    @Post('anonymous')
    async createAnonymous(@Req() req): Promise<User> {
        const names = ['Hiker', 'Walkr', 'Guru', 'Rider', 'Pal', 'Doodee']
        const user = await this.authParams.userService.create({
            username: `Noughty${names[~~(Math.random() * names.length)]}`
        })
        req.session = { userId: user.id }
        return this.authParams.userService.map(user)
    }
}
