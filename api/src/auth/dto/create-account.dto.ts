import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsStrongPassword,
  Length,
} from "class-validator";

export class CreateAccountDto {
  @IsNotEmpty()
  @IsAlpha()
  @Length(2, 256)
  firstName: string;

  @IsNotEmpty()
  @IsAlpha()
  @Length(2, 256, {
    message:
      "$property should be between $constraint1 to $constraint2 characters.",
  })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(4, 16, {
    message:
      "$property should be between $constraint1 to $constraint2 characters.",
  })
  contact: string;

  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    },
    {
      message: ({ constraints }) => {
        return [
          `Password must have the following:`,
          `- A minimum length of ${constraints[0].minLength} characters.`,
          `- At least ${constraints[0].minLowercase} lowercase letters.`,
          `- At least ${constraints[0].minUppercase} uppercase letters.`,
          `- At least ${constraints[0].minNumber} number.`,
          `- At least ${constraints[0].minSymbols} symbol.`,
        ].join("\n");
      },
    }
  )
  password: string;
}

