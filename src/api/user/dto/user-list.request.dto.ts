import { Transform } from 'class-transformer';
import { UserTypeEnum } from '../entities/user.entity';
import { intParser } from '../../../common/utilities/sanitize.utility';
import { IsString, IsOptional, IsEnum, IsPositive } from 'class-validator';

/*
 * @TODO Move PaginationDto to some common place for reuse in another list responses
 * */
export class PaginationDto {
  @IsPositive()
  @IsOptional()
  @Transform(intParser)
  page?: number;

  @IsPositive()
  @IsOptional()
  @Transform(intParser)
  limit?: number;
}

export class UserListRequestDto extends PaginationDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  surname?: string;

  @IsEnum(UserTypeEnum)
  @IsOptional()
  type?: string;
}
