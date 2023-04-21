export interface CreateUserDto {
    email?: string;
    username: string;
    firstname?: string;
    lastname?: string;
    apple_token?: string;
    google_token?: string;
    facebook_token?: string;
    gender?: string;
}