import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { User } from "./entities/user.entity";

@Controller("account")
@ApiTags("account")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: User,
  })
  async signup(@Body() dto: CreateAccountDto): Promise<User> {
    return this.authService.signup(dto);
  }
}

