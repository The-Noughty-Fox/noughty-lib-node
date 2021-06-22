# Noughty Lib

## Installation

Add this to your `package.json`.
```bash
"dependencies": {
  "noughty-lib-node": "git+ssh://git@github.com:The-Noughty-Fox/noughty-lib-node"
}
```

Then run

```bash
npm install
```

## Features

### Authentication
NoughtyLib uses [Passport](http://www.passportjs.org) and several other libraries to provide out-of-the-box authentication.

#### Routes

`AuthenticationModule` provides several new routes:
* `POST /auth/apple` used for *Sign in With Apple*.
* `POST /auth/apple_test` used for testing the authentication when missing an actual client.

#### Integration
```typescript
import {AuthenticationModule, AuthenticationParams} from "noughty-lib-node";

@Module({
    imports: [
        ConfigModule,
        UserDbModule,
        AuthenticationModule.forRootAsync({
            imports: [ConfigModule, UserDbModule],
            inject: [Config, UserDbService],
            useFactory: (config: Config, userDbService: UserDbService): AuthenticationParams => {
                return {
                    secret: config.SECRET,
                    userService: userDbService,
                    appleConfig: config.APPLE
                }
            }
        }),
        ...
    ],
})
export class AppModule {}
```

#### Guards
Consumers shouldn't do any additional work to support actual authentication, the routes are already provided. When authentication succeeds, a `Set-Cookie` will be returned to the client with an authenticated session encrypted with the provided `secret` containing the `userId`.
In order to authenticate subsequent requests you can use the `AuthenticationGuard` provided by the module:
```typescript
@Controller('current_user')
export class CurrentUserController {
    @UseGuards(AuthenticationGuard)
    @Get()
    getUser(@Req() req, @Session() session: { userId: number }): Promise<User> {
        // Here you have access to session.userId field, or the validated user itself
        return req.user
    }
}
```

#### Description

Consumers should return an instance of `AuthenticationParams` from the `useFactory` method. `imports` are the modules that contain the providers that will be `inject`ed into the `useFactory` constructor:
```typescript
export interface AuthenticationParams {
    secret: string
    userService: UserDbInterface
    appleConfig: AppleConfig
}
```
* `secret` is used to encode/decode the session returned to the user
* `userService` is an object conforming to `UserDbInterface` used by the library to access the actual user database.
```typescript
export interface UserDbInterface {
    findById(id: number): Promise<any>
    findByAppleToken(token: string): Promise<any>
    create(dto: CreateUserDto): Promise<any>
}
```
* `appleConfig` is an object used to configure SIWA.
```typescript
@Injectable()
export class AppleConfig {
    constructor(
        public clientID: string,
        public teamID: string,
        public keyID: string,
        public key: Buffer,
        public scope: string[]
    ) {}
}
```


