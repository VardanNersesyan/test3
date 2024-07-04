import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { WorkField } from '../entities/work-field.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class WorkFieldExistsValidator implements ValidatorConstraintInterface {
  async validate(workFieldId: number, args: ValidationArguments) {
    const workField = await WorkField.findByPk(workFieldId);

    return !!workField;
  }

  defaultMessage(args: ValidationArguments) {
    return `WorkField with id ${args.value} does not exist.`;
  }
}

export function WorkFieldExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: WorkFieldExistsValidator,
    });
  };
}
