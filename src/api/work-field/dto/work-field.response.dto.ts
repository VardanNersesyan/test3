import { Exclude } from 'class-transformer';

export class WorkFieldResponseDto {
  id: number;
  title: string;
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<WorkFieldResponseDto>) {
    Object.assign(this, partial);
  }
}
