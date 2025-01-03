import { Controller, Post, Delete, Param, Body } from '@nestjs/common';
import { DelaysService } from './delays.service';
import { SetDelayDto } from 'src/common/dto/set-delay.dto';

@Controller('trip/delays')
export class DelaysController {
  constructor(private readonly delaysService: DelaysService) {}

  @Post(':id')
  async setDelay(
    @Param('id') trainNumber: string,
    @Body() setDelayDto: SetDelayDto,
  ) {
    const { delay } = setDelayDto;

    if (delay === 0) {
      // Call removeDelay service if delay is 0
      await this.delaysService.removeDelay(trainNumber);
      return {
        message: `Delay for trip ${trainNumber} has been removed.`,
      };
    }

    return this.delaysService.setDelay(trainNumber, delay);
  }

  @Delete(':id')
  async removeDelay(@Param('id') trainNumber: string) {
    return this.delaysService.removeDelay(trainNumber);
  }
}
