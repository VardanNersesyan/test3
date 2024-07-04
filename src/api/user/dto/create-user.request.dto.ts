import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserRequestDto {
  @MaxLength(255)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @MaxLength(255)
  @IsNotEmpty()
  password: string;
}
