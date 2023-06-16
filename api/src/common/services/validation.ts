import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";

export class FormattedValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new BadRequestException(
          errors.reduce(
            (formatted: Record<string, string[]>, err: ValidationError) => ({
              ...formatted,
              [err.property]: Object.values(err.constraints ?? {}),
            }),
            {}
          )
        ),
    });
  }
}
