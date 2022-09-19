import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(32)
  firstName: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(32)
  lastName: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(32)
  password: string;
}
