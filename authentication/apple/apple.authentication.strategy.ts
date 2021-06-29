import {Inject, Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import * as AppleStrategy from "@nicokaiser/passport-apple";
import {InjectableToken} from "../../injectable.token";
import {CreateUserDto} from "../dto/createuser.dto";
import {
    AppleAuthenticationDto,
    AppleAuthenticationUserInfoDto
} from "../dto/appleauthentication.dto";
import {AuthenticationParams} from "../authentication.module";


@Injectable()
export class AppleAuthenticationStrategy extends PassportStrategy(AppleStrategy.Strategy) {

    constructor(
        @Inject(InjectableToken.AUTH_PARAMS) private authParams: AuthenticationParams
    ) {
        super({...authParams.appleConfig, ...{passReqToCallback: true}})
    }

    validate<User>(req: Request, accessToken: string, refreshToken: string, profile: any): Promise<User> {
        if (!profile.id) return Promise.reject("Apple jwt token does not contain the 'sub' field.")
        return this.authParams.userService.findByAppleToken(profile.id as string)
            .then((user) => {
                if (user) return user;
                return this.createUser(profile, (req.body as any).userInfo);
            })
    }

    private createUser<User>(profile: any, userInfo?: AppleAuthenticationUserInfoDto): Promise<User> {
        const { id, email } = profile
        const dto = new CreateUserDto();
        dto.email = email;
        dto.apple_token = id;
        dto.username = userInfo?.name.given || 'Unknown';

        return this.authParams.userService.create(dto);
    }
}