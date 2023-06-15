import { SecurityConfig } from "@config";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "nestjs-prisma";
import request from "supertest";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe("The AuthController", () => {
  const securityConfig: SecurityConfig = {
    saltRounds: 10,
  };

  let app: INestApplication;
  let createMock: jest.Mock;

  beforeEach(async () => {
    createMock = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [
            () => ({
              security: securityConfig,
            }),
          ],
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        ConfigService,
        {
          provide: PrismaService,
          useValue: {
            create: createMock,
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it("should be defined", () => {
    expect(app).toBeDefined();
  });

  describe("when a POST /signup request is made", () => {
    describe("and an invalid user is passed", () => {
      it("should return 400", () => {
        return request(app.getHttpServer())
          .post("/account/signup")
          .send({
            firstName: null,
          })
          .expect(400);
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
