import { registerAs } from "@nestjs/config";

import { Config } from "@@common/constants/config";
import { SecurityConfig } from "../config.interface";

export default registerAs(
  Config.SECURITY,
  (): SecurityConfig => ({
    saltRounds: 10,
  })
);
