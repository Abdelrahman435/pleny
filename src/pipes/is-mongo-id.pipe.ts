import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class IsMongoIdPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!value || typeof value !== 'string') {
      throw new BadRequestException('Validation failed: ID must be a string.');
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(
        `Validation failed: "${value}" is not a valid Mongo ID.`,
      );
    }

    return value;
  }
}
