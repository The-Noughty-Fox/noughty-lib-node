export class AppleAuthenticationUserNameDto {
    given?: string
    family?: string
    nickname?: string
    middle?: string
}

export class AppleAuthenticationUserInfoDto {
    email: string
    name: AppleAuthenticationUserNameDto
    identifier: string
}

export class AppleAuthenticationDto {
    userInfo?: AppleAuthenticationUserInfoDto
    token: string
    authorizationCode: string
}