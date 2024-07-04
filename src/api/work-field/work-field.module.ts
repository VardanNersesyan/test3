import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkFieldService } from './work-field.service';
import { WorkField } from './entities/work-field.entity';
import { WorkFieldController } from './work-field.controller';
import { WorkFieldRepository } from './work-field.repository';

@Module({
  imports: [SequelizeModule.forFeature([WorkField])],
  controllers: [WorkFieldController],
  providers: [WorkFieldRepository, WorkFieldService],
  exports: [WorkFieldRepository, WorkFieldService],
})
export class WorkFieldModule {}
