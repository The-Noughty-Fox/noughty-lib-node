import {
    Controller,
    Post,
    UseGuards,
    UsePipes,
    Req, Inject, Param, ParseIntPipe, BadRequestException
} from "@nestjs/common";
import {AnonymousAppleAuthenticationGuard} from "./apple/apple.authentication.guard";
import {InjectableToken} from "../injectable.token";
import {AuthenticationParams} from "./authentication.module";
import {CreateUserDto} from "./dto/createuser.dto";
import {GoogleAuthenticationGuard} from "./google/google.authentication.guard";

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

    @Post('test/:id')
    async loginTest(@Req() req, @Param('id', ParseIntPipe) id: number): Promise<User> {
        const user = await this.authParams.userService.findById(id)
        if (!user)
            throw new BadRequestException(`User with id ${id} does not exist`)
        req.session = { userId: id }
        return this.authParams.userService.map(user)
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
