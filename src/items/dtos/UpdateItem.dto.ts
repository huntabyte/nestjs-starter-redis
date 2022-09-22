import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateItemDto {
  @IsNotEmpty()
  @MaxLength(64)
  @MinLength(2)
  @IsOptional()
  name?: string;

  @IsOptional()
  @MinLength(2)
  @MaxLength(255)
  description?: string;
}
