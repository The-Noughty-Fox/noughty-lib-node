export interface CreateUserDto {
    email?: string;
    username: string;
    apple_token?: string;
    google_token?: string;
    facebook_token?: string;
}