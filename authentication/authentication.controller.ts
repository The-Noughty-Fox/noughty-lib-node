import {
    Controller,
    Post,
    UseGuards,
    UsePipes,
    Req, Inject, Param, ParseIntPipe, BadRequestException
} from "@nestjs/common";
import {AppleAuthenticationGuard} from "./apple/apple.authentication.guard";
import {InjectableToken} from "../injectable.token";
import {AuthenticationParams} from "./authentication.module";
import {CreateUserDto} from "./dto/createuser.dto";

@Controller('auth')
export class AuthenticationController<User> {

    constructor(
        @Inject(InjectableToken.AUTH_PARAMS)
        private authParams: AuthenticationParams
    ) {}

    @UseGuards(AppleAuthenticationGuard)
    @Post('apple')
    async authenticate(@Req() req): Promise<User> {
        if (req.user && req.user.id) {
            req.session = { userId: req.user.id }
            return this.authParams.userService.map(req.user)
        }
        return Promise.reject('Authentication failed')
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
        const dto = new CreateUserDto()
        const names = ['Hiker', 'Walkr', 'Guru', 'Rider', 'Pal', 'Doodee']
        dto.username = `Noughty${names[~~(Math.random() * names.length)]}`
        const user = await this.authParams.userService.create(dto)
        req.session = { userId: user.id }
        return this.authParams.userService.map(user)
    }
}
