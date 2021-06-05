export declare class AppleAuthenticationUserNameDto {
    given?: string;
    family?: string;
    nickname?: string;
    middle?: string;
}
export declare class AppleAuthenticationUserInfoDto {
    email: string;
    name: AppleAuthenticationUserNameDto;
    identifier: string;
}
export declare class AppleAuthenticationDto {
    userInfo?: AppleAuthenticationUserInfoDto;
    token: string;
    authorizationCode: string;
}
