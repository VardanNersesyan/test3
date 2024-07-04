import { Op } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize/types/model';
import { WorkField } from './entities/work-field.entity';

@Injectable()
export class WorkFieldRepository {
  constructor(
    @InjectModel(WorkField)
    private readonly workFieldModel: typeof WorkField,
  ) {}

  autocomplete(search?: string) {
    const searchParams: FindOptions = {};

    if (search) {
      searchParams.where = {
        title: {
          [Op.iLike]: `%${search}%`,
        },
      };
    }

    return this.workFieldModel.findAll(searchParams);
  }
}
