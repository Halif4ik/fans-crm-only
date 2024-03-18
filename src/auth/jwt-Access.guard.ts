import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtAuthAccessGuard implements CanActivate {
  constructor(private jwtService: JwtService, private readonly userService: UserService,
              private readonly configService: ConfigService) {
  }

  /*decode with Key word for refreshToken  ONLY*/
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeder = req.headers.authorization;
      let bearer, token;
      if (authHeder) {
        bearer = authHeder.split(" ")[0];
        token = authHeder.split(" ")[1];
      }
      if (bearer !== "Bearer" || !token)
        throw new UnauthorizedException({ message: "User doesnt authorized" });

      const userFromJwt = this.jwtService.verify(token, { secret: this.configService.get<string>("SECRET_ACCESS") });
      /*becouse in jwt always present id*/
      const userFromBd: User | null = userFromJwt["id"] ? await this.userService.getUserById(userFromJwt["id"]) : null;
      req.user = userFromBd;
      return req.user;
    } catch (e) {
      console.log("canActivate-", e);
      throw new UnauthorizedException({ message: "User doesnt authorized" });
    }
  }

}