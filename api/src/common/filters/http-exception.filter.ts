import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger("HttpException");

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse().valueOf() as any;

    const errorResponse = {
      status,
      timestamp: new Date().toISOString(),
      message: exceptionResponse.hasOwnProperty("error")
        ? exceptionResponse["message"]
        : exceptionResponse,
      error: exceptionResponse.hasOwnProperty("error")
        ? exceptionResponse["error"]
        : undefined,
    };

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(JSON.stringify({ message: errorResponse.message }));
    }

    res.status(status).json(errorResponse);
  }
}
