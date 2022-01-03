export class GoogleConfig {
    constructor(
        public readonly clientID: string,
        public readonly clientSecret: string,
        public readonly audience: string | string[],
        public readonly scope: string | string[]
    ) {}
}