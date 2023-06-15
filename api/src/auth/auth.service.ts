import { SecurityConfig } from "@config";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { PrismaService } from "nestjs-prisma";
import { CreateAccountDto } from "./dto/create-account.dto";
import { User } from "./entities/user.entity";

function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  signin() {}

  async signup(data: CreateAccountDto): Promise<User> {
    const { saltRounds } =
      this.configService.getOrThrow<SecurityConfig>("security");
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;

    const user = await this.prismaService.user.create({ data });
    return exclude(user, ["password"]);
  }

  signout() {}

  getAuthenticatedUser() {}
}

