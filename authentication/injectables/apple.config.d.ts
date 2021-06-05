/// <reference types="node" />
export declare class AppleConfig {
    clientID: string;
    teamID: string;
    keyID: string;
    key: Buffer;
    scope: string[];
    constructor(clientID: string, teamID: string, keyID: string, key: Buffer, scope: string[]);
}
