import { IsInt, Min, Max } from 'class-validator';

export class SetDelayDto {
  @IsInt()
  @Min(0) // Allow 0 to indicate no delay
  @Max(1440) // Ensures the delay is not larger than a day in minutes
  delay: number; // in minutes
}
