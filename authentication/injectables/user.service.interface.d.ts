import { CreateUserDto } from "../dto/createuser.dto";
export interface UserDbInterface {
    findById(id: number): Promise<any>;
    findByAppleToken(token: string): Promise<any>;
    create(dto: CreateUserDto): Promise<any>;
}
