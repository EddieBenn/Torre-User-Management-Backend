import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum, RolesEnum } from 'src/base.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserResponseDto {
  @ApiProperty({
    required: false,
    example: 'John',
    description: 'First name of the user',
  })
  first_name?: string;

  @ApiProperty({
    required: false,
    example: 'Doe',
    description: 'Last name of the user',
  })
  last_name?: string;

  @ApiProperty({
    required: false,
    example: 'user@example.com',
    description: 'Email of the user',
  })
  email?: string;

  @ApiProperty({
    required: false,
    example: '+2348104467932',
    description: 'Phone number of the user',
  })
  phone?: string;

  @ApiProperty({
    required: false,
    example: 'Lagos',
    description: 'City of the user',
  })
  city?: string;

  @ApiProperty({
    required: false,
    example: 'male',
    description: 'Gender of the user',
  })
  gender?: GenderEnum;

  @ApiProperty({
    required: false,
    example: 'admin',
    description: 'Role of the user',
  })
  role?: RolesEnum;
}
