import {CreateUserDto} from "../dto/createuser.dto";

export interface IUserService {
    findById(id: number): Promise<any>
    findByAppleToken(token: string): Promise<any>
    create(dto: CreateUserDto): Promise<any>
    map(user: any): any
}