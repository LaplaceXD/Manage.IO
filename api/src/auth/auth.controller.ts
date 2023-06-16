import { User } from "@@database/entities";
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateAccountDto } from "./dto/create-account.dto";

@Controller("account")
@ApiTags("account")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  @UseInterceptors(ClassSerializerInterceptor)
  async signup(@Body() dto: CreateAccountDto): Promise<User> {
    return this.authService.signup(dto);
  }
}

