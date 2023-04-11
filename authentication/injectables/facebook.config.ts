import {Injectable} from "@nestjs/common";

@Injectable()
export class FacebookConfig {
    constructor(
        public clientID: string,
        public clientSecret: string,
        public callbackURL: string,
        public scope: string[],
        public profileFields: ["emails", "name"]
    ) {}
}