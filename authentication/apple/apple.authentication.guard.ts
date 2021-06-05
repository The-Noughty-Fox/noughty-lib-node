import { ExecutionContext } from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import { Observable } from "rxjs";

export class AppleAuthenticationGuard extends AuthGuard('apple') {}
