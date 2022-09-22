import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @MaxLength(64)
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(32)
  @IsOptional()
  firstName?: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(32)
  @IsOptional()
  lastName?: string;
}
