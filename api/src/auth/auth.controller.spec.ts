import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import request from "supertest";

import { SecurityConfig } from "@@config";
import { User } from "@@database/entities";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe("The AuthController", () => {
  const securityConfig: SecurityConfig = {
    saltRounds: 10,
  };

  let app: INestApplication;
  let saveMock: jest.Mock;

  beforeEach(async () => {
    saveMock = jest.fn();

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
          provide: getRepositoryToken(User),
          useValue: {
            save: saveMock,
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
