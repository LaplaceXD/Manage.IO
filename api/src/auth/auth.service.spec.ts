import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { User } from "@@database/entities";
import { AuthService } from "./auth.service";
import { CreateAccountDto } from "./dto/create-account.dto";

describe("The AuthService", () => {
  const password: string = "Abcd1234!";

  let user: User;
  let userDto: CreateAccountDto;
  let authService: AuthService;
  let createMock: jest.Mock;
  let saveMock: jest.Mock;

  beforeEach(async () => {
    saveMock = jest.fn();
    createMock = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: createMock,
            save: saveMock,
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

      createMock.mockReturnValue(user);
      saveMock.mockResolvedValue(user);
    });

    describe("and a valid user DTO is provided", () => {
      it("should create and return the new user", async () => {
        const result = await authService.signup(userDto);
        expect(result).toBe(user);
      });
    });
  });
});

