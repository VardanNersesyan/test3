import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { trim } from '../../../common/utilities/sanitize.utility';
import { UserTypeEnum } from '../../user/entities/user.entity';
import { WorkFieldExists } from '../../work-field/validators/work-field-exists.validator';
export class SignUpRequestDto {
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

  @MaxLength(255)
  @Transform(trim)
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @Transform(trim)
  @IsNotEmpty()
  surname: string;

  @WorkFieldExists()
  @IsOptional()
  workFieldId: number;

  @IsEnum(UserTypeEnum)
  @IsNotEmpty()
  type: string;

  @MaxLength(255)
  @Transform(trim)
  @IsNotEmpty()
  position: string;

  @MaxLength(255)
  @Transform(trim)
  @IsNotEmpty()
  shortDescription: string;

  @MaxLength(2000)
  @Transform(trim)
  @IsNotEmpty()
  education: string;

  @MaxLength(2000)
  @Transform(trim)
  @IsNotEmpty()
  experience: string;

  @MaxLength(2000)
  @Transform(trim)
  @IsNotEmpty()
  about: string;
}
