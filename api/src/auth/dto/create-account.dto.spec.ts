import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateAccountDto } from "./create-account.dto";

describe("The CreateAccountDto should", () => {
  const userInfo: CreateAccountDto = {
    firstName: "John",
    lastName: "Smith",
    email: "john@smith.com",
    contact: "09999999999",
    password: "Abcd1234!",
  };

  it("should return no errors if the Dto is valid", async () => {
    const dto = plainToInstance(CreateAccountDto, userInfo);

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe("validate", () => {
    describe("the firstName", () => {
      it("to be required", async () => {
        const { firstName, ...picked } = userInfo;
        const dto = plainToInstance(CreateAccountDto, picked);

        const errors = await validate(dto);
        expect(errors.length).toBe(1);
      });

      it("to not have a length of less than 1", async () => {
        const dto = plainToInstance(CreateAccountDto, {
          ...userInfo,
          firstName: "A",
        });

        const errors = await validate(dto);
        expect(errors.length).toBe(1);
      });

      it("to not have a length of greater than 256", async () => {
        const dto = plainToInstance(CreateAccountDto, {
          ...userInfo,
          firstName: Array.from({ length: 257 }, () => "a").join(""),
        });

        const errors = await validate(dto);
        expect(errors.length).toBe(1);
      });

      it("to not allow non-alpha characters", async () => {
        const dto = plainToInstance(CreateAccountDto, {
          ...userInfo,
          firstName: "John1",
        });

        const errors = await validate(dto);
        expect(errors.length).toBe(1);
      });
    });

    describe("the lastName", () => {
      it("to be required", async () => {
        const { lastName, ...picked } = userInfo;
        const dto = plainToInstance(CreateAccountDto, picked);

        const errors = await validate(dto);
        expect(errors.length).toBe(1);
      });

      it("to not have a length of less than 1", async () => {
        const dto = plainToInstance(CreateAccountDto, {
          ...userInfo,
          lastName: "A",
        });

        const errors = await validate(dto);
        expect(errors.length).toBe(1);
      });

      it("to not have a length of greater than 256", async () => {
        const dto = plainToInstance(CreateAccountDto, {
          ...userInfo,
          lastName: Array.from({ length: 257 }, () => "a").join(""),
        });

        const errors = await validate(dto);
        expect(errors.length).toBe(1);
      });

      it("to not allow non-alpha characters", async () => {
        const dto = plainToInstance(CreateAccountDto, {
          ...userInfo,
          lastName: "John1",
        });

        const errors = await validate(dto);
        expect(errors.length).toBe(1);
      });
    });

    describe("the email", () => {
      it("to be required", async () => {
        const { email, ...picked } = userInfo;
        const dto = plainToInstance(CreateAccountDto, picked);

        const errors = await validate(dto);
        expect(errors.length).toBe(1);
      });

      it("to not allow emails with no domains", async () => {
        const dto = plainToInstance(CreateAccountDto, {
          ...userInfo,
          email: "email@.com",
        });

        const errors = await validate(dto);
        expect(errors.length).toBe(1);
      });

      it("to not allow emails with no extension", async () => {
        const dto = plainToInstance(CreateAccountDto, {
          ...userInfo,
          email: "email@email.",
        });

        const errors = await validate(dto);
        expect(errors.length).toBe(1);
      });
    });

    describe("validate", () => {
      describe("the contact", () => {
        it("to be required", async () => {
          const { contact, ...picked } = userInfo;
          const dto = plainToInstance(CreateAccountDto, picked);

          const errors = await validate(dto);
          expect(errors.length).toBe(1);
        });

        it("to not have a length of less than 4", async () => {
          const dto = plainToInstance(CreateAccountDto, {
            ...userInfo,
            contact: "099",
          });

          const errors = await validate(dto);
          expect(errors.length).toBe(1);
        });

        it("to not have a length of greater than 16", async () => {
          const dto = plainToInstance(CreateAccountDto, {
            ...userInfo,
            contact: Array.from({ length: 17 }, () => "9").join(""),
          });

          const errors = await validate(dto);
          expect(errors.length).toBe(1);
        });

        it("to not allow non-numeric characters", async () => {
          const dto = plainToInstance(CreateAccountDto, {
            ...userInfo,
            contact: "+63999999999A",
          });

          const errors = await validate(dto);
          expect(errors.length).toBe(1);
        });
      });
    });

    describe("the password", () => {
      it("to be required", async () => {
        const { password, ...picked } = userInfo;
        const dto = plainToInstance(CreateAccountDto, picked);

        const errors = await validate(dto);
        expect(errors.length).toBe(1);
      });

      it("to be a minimum of 8 characters", async () => {
        const dto = plainToInstance(CreateAccountDto, {
          ...userInfo,
          password: "Abc123!",
        });

        const errors = await validate(dto);
        expect(errors.length).toBe(1);
      });

      it("to at least have 1 lowercase letter", async () => {
        const dto = plainToInstance(CreateAccountDto, {
          ...userInfo,
          password: "ABC1234!",
        });

        const errors = await validate(dto);
        expect(errors.length).toBe(1);
      });

      it("to at least have 1 uppercase letter", async () => {
        const dto = plainToInstance(CreateAccountDto, {
          ...userInfo,
          password: "abcd1234!",
        });

        const errors = await validate(dto);
        expect(errors.length).toBe(1);
      });

      it("to at least have 1 number", async () => {
        const dto = plainToInstance(CreateAccountDto, {
          ...userInfo,
          password: "Abcdefg!",
        });

        const errors = await validate(dto);
        expect(errors.length).toBe(1);
      });

      it("to at least have 1 symbol", async () => {
        const dto = plainToInstance(CreateAccountDto, {
          ...userInfo,
          password: "Abcd1234",
        });

        const errors = await validate(dto);
        expect(errors.length).toBe(1);
      });
    });
  });
});
