import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @MaxLength(40)
  readonly email: string;

  @IsString()
  @MaxLength(30)
  readonly password: string;
}
