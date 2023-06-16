import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";

import { SecurityConfig } from "@@config";
import { User } from "@@database/entities";
import { CreateAccountDto } from "./dto/create-account.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService
  ) {}

  signin() {}

  async signup(data: CreateAccountDto): Promise<User> {
    const { saltRounds } =
      this.configService.getOrThrow<SecurityConfig>("security");
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;

    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  signout() {}

  getAuthenticatedUser() {}
}

