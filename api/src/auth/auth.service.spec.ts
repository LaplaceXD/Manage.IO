import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { User } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";
import { AuthService } from "./auth.service";
import { CreateAccountDto } from "./dto/create-account.dto";

describe("The AuthService", () => {
  const password: string = "Abcd1234!";

  let user: User;
  let userDto: CreateAccountDto;
  let authService: AuthService;
  let createMock: jest.Mock;

  beforeEach(async () => {
    createMock = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: createMock,
            },
          },
        },
      ],
      imports: [
        ConfigModule.forRoot({
          load: [
            () => ({
              security: {
                saltRounds: 10,
              },
            }),
          ],
        }),
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(authService).toBeDefined();
  });

  describe("when calling the register method", () => {
    beforeEach(async () => {
      userDto = {
        firstName: "Jonh",
        lastName: "Smith",
        email: "johnsmith@example.com",
        password,
        contact: "09999999999",
      };

      user = {
        id: 1,
        ...userDto,
        provider: null,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      createMock.mockResolvedValue(user);
    });

    describe("and a valid user DTO is provided", () => {
      it("should create and return the new user", async () => {
        const result = await authService.signup(userDto);
        expect(result).toBe(user);
      });
    });
  });
});

