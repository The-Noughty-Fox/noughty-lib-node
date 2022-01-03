import {CreateUserDto} from "../dto/createuser.dto";

export interface IUserService {
    findById(id: number): Promise<any>
    findByEmail(email: string): Promise<any>
    findByGoogleToken(token: string): Promise<any>
    findByAppleToken(token: string): Promise<any>
    create(dto: CreateUserDto): Promise<any>
    map(user: any): any
    link(oldUser: any, newUser: any): Promise<any>
}