import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @MaxLength(64)
  name: string;

  @MaxLength(255)
  description: string;
}
