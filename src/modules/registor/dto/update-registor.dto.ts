import { PartialType } from '@nestjs/swagger';
import { CreateRegistorDto } from './create-registor.dto';

export class UpdateRegistorDto extends PartialType(CreateRegistorDto) {}
