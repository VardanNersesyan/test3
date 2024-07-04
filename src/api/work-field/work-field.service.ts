import { Injectable } from '@nestjs/common';
import { WorkFieldRepository } from './work-field.repository';
import { WorkFieldRequestDto, WorkFieldResponseDto } from './dto';

@Injectable()
export class WorkFieldService {
  constructor(private workFieldRepository: WorkFieldRepository) {}
  async autocomplete(
    workFieldRequest: WorkFieldRequestDto,
  ): Promise<WorkFieldResponseDto[]> {
    const fields = await this.workFieldRepository.autocomplete(
      workFieldRequest.search,
    );

    return fields.map(
      (field) => new WorkFieldResponseDto(field.get({ plain: true })),
    );
  }
}
