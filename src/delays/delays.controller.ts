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
    console.log(
      `Received trainNumber: ${trainNumber} with delay: ${setDelayDto.delay}`,
    );
    return this.delaysService.setDelay(trainNumber, setDelayDto.delay);
  }

  @Delete(':id')
  async removeDelay(@Param('id') trainNumber: string) {
    return this.delaysService.removeDelay(trainNumber);
  }
}
