import { DynamicModule } from "@nestjs/common";
import { UserDbInterface } from "./injectables/userdb.interface";
import { AppleConfig } from "./injectables/apple.config";
import { ModuleMetadata } from "@nestjs/common/interfaces";
export interface AuthenticationOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[]) => AuthenticationParams;
    inject?: any[];
}
export interface AuthenticationParams {
    secret: string;
    userService: UserDbInterface;
    appleConfig: AppleConfig;
}
export declare class AuthenticationModule {
    static forRoot(options: AuthenticationOptions): DynamicModule;
}
