import { ApiHideProperty } from "@nestjs/swagger";
import { Provider } from "@prisma/client";

export class User {
  /**
   * The id of the user.
   *
   * @example 1
   */
  id: number;

  provider: Provider | null;

  /**
   * @example John
   */
  firstName: string;

  /**
   * @example Smith
   */
  lastName: string;

  /**
   * @example john@smith.com
   */
  email: string;

  /**
   * @example +631233457890
   */
  contact: string;

  @ApiHideProperty()
  password?: string;

  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
