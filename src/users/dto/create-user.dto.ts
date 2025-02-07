import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @MaxLength(30)
  readonly email: string;

  @IsString()
  @MaxLength(30)
  readonly password: string;
}
