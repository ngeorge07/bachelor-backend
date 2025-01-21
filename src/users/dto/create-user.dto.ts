import {
  IsNotEmpty,
  IsEmail,
  Validate,
  IsArray,
  ArrayNotEmpty,
  IsEnum,
} from 'class-validator';
import { CustomPasswordValidator } from './validators/CustomPasswordValidator';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Please enter a name.' })
  fullName: string;

  @IsNotEmpty({ message: 'Email cannot be empty.' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty.' })
  @Validate(CustomPasswordValidator, {
    message:
      'Password must be at least 6 characters long and contain at least one uppercase letter and one number.',
  })
  password: string;

  @IsArray({ message: 'Roles must be an array.' })
  @ArrayNotEmpty({ message: 'Roles array cannot be empty.' })
  @IsEnum(Role, { each: true, message: 'Each role must be a valid Role.' })
  roles: Role[] = [Role.Admin]; // Set a default role
}
