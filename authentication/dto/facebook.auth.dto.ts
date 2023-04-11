export class FacebookUser {
    email: string;
    firstName: string;
    lastName: string;
}

export class FacebookAuthDto {
    user: FacebookUser;
    accessToken: string;
}