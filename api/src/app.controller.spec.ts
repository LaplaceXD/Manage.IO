import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("The AppController", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it("should be defined", () => {
    expect(app).toBeDefined();
  });

  describe("when a GET /ping request is made", () => {
    it("should return pong", () => {
      return request(app.getHttpServer())
        .get("/ping")
        .expect(HttpStatus.OK)
        .expect({ message: "pong!" });
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
