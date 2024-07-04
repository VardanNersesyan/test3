import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { trim } from '../../../common/utilities/sanitize.utility';
export class SignInRequestDto {
  @MaxLength(255)
  @IsEmail()
  @IsNotEmpty()
  @Transform(trim)
  email: string;

  @MinLength(8)
  @MaxLength(255)
  @IsNotEmpty()
  @Transform(trim)
  password: string;
}
