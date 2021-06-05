import {Injectable} from "@nestjs/common";

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