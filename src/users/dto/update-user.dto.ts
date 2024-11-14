import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum, RolesEnum } from 'src/base.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserResponseDto {
  @ApiProperty({
    required: true,
    example: 'John',
    description: 'First name of the user',
  })
  first_name?: string;

  @ApiProperty({
    required: true,
    example: 'Doe',
    description: 'Last name of the user',
  })
  last_name?: string;

  @ApiProperty({
    required: true,
    example: 'user@example.com',
    description: 'Email of the user',
  })
  email?: string;

  @ApiProperty({
    required: true,
    example: '+2348104467932',
    description: 'Phone number of the user',
  })
  phone?: string;

  @ApiProperty({
    required: true,
    example: 'Lagos',
    description: 'City of the user',
  })
  city?: string;

  @ApiProperty({
    required: true,
    example: 'male',
    description: 'Gender of the user',
  })
  gender?: GenderEnum;

  @ApiProperty({
    required: true,
    example: 'admin',
    description: 'Role of the user',
  })
  role?: RolesEnum;
}
