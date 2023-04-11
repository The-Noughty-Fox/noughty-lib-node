export class InjectableToken {
    static AUTH_PARAMS = Symbol('AUTH_PARAMS')
    static APPLE_GUARD = Symbol('APPLE_GUARD')
    static GOOGLE_GUARD = Symbol('GOOGLE_GUARD')
    static FACEBOOK_GUARD = Symbol('FACEBOOK_GUARD')
}