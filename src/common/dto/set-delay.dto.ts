import { IsInt, Min, Max, IsPositive } from 'class-validator';

export class SetDelayDto {
  @IsInt()
  @Min(1) // Ensures the delay is at least 1 minute (if applicable)
  @Max(1440) // Ensures the delay is not larger than a day in minutes (adjust as needed)
  @IsPositive() // Ensures it's a positive integer (not negative or zero)
  delay: number; //in minutes
}
