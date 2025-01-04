import { IsString, MaxLength } from 'class-validator';

export class RemarkDto {
  @IsString()
  @MaxLength(200, { message: 'Message must not exceed 200 characters.' }) // Adjust limit as needed
  message: string;
}
