import { UserTypeEnum } from '../entities/user.entity';
import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { trim } from '../../../common/utilities/sanitize.utility';
import { WorkFieldExists } from '../../work-field/validators/work-field-exists.validator';

export class UpdateUserRequestDto {
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
  type: UserTypeEnum;

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
