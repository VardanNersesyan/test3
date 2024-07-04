import { Expose, Type, Exclude } from 'class-transformer';
import { WorkFieldResponseDto } from '../../work-field/dto/work-field.response.dto';

export class UserProfileResponseDto {
  @Exclude()
  password: string;

  @Exclude()
  refreshToken: string | null;

  @Exclude()
  updatedAt: Date;

  @Expose()
  @Type(() => WorkFieldResponseDto)
  workField: WorkFieldResponseDto;

  constructor(partial: Partial<UserProfileResponseDto>) {
    Object.assign(this, partial);
    this.workField = partial.workField
      ? new WorkFieldResponseDto(partial.workField)
      : null;
  }
}
