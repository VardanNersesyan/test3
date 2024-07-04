import { Controller, Get, Query } from '@nestjs/common';
import { WorkFieldService } from './work-field.service';
import { WorkFieldRequestDto, WorkFieldResponseDto } from './dto';
import { ItemsListResponseUtility } from '../../common/utilities/responses.utility';

@Controller('work-field')
export class WorkFieldController {
  constructor(private readonly workFieldService: WorkFieldService) {}

  @Get('autocomplete')
  async autocomplete(@Query() workFieldRequest: WorkFieldRequestDto) {
    return new ItemsListResponseUtility<WorkFieldResponseDto>({
      success: true,
      items: await this.workFieldService.autocomplete(workFieldRequest),
    });
  }
}
