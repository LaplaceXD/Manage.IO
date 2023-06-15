import { AuthProvider } from "@@common/constants";
import { ApiHideProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn({ name: "user_id", unsigned: true })
  id: number;

  @ApiHideProperty()
  @Column({ type: "enum", enum: AuthProvider, nullable: true })
  @Exclude()
  provider: AuthProvider | null;

  /**
   * @example John
   */
  @Column({ name: "first_name", length: 256 })
  firstName: string;

  /**
   * @example Smith
   */
  @Column({ name: "last_name", length: 256 })
  lastName: string;

  /**
   * @example john@smith.com
   */
  @Column({ length: 256, unique: true })
  email: string;

  /**
   * @example +631233457890
   */
  @Column({ length: 16, unique: true })
  contact: string;

  @ApiHideProperty()
  @Column({ length: 60 })
  @Exclude()
  password: string;

  @Column({ name: "last_login", type: "timestamptz", nullable: true })
  lastLogin: Date | null;

  @Column({
    name: "created_at",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    name: "updated_at",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
