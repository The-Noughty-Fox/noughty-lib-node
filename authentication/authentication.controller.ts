import {
    Controller,
    Post,
    UseGuards,
    UsePipes,
    Req
} from "@nestjs/common";
import {AppleAuthenticationGuard} from "./apple/apple.authentication.guard";

@Controller('auth')
export class AuthenticationController<User> {
    @UseGuards(AppleAuthenticationGuard)
    @UsePipes()
    @Post('apple')
    async authenticate(@Req() req): Promise<User> {
        req.session = { userId: req.user.id }
        return req.user
    }

    // @UseGuards(AppleAuthenticationGuard)
    @UsePipes()
    @Post('apple_test')
    async authenticateTest(@Req() req): Promise<User> {
        req.session = { userId: 1 }
        return req.session
    }
}
