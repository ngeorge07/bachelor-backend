import { Controller, Post, Delete, Param, Body } from '@nestjs/common';
import { DelaysService } from './delays.service';

@Controller('trip')
export class DelaysController {
  constructor(private readonly delaysService: DelaysService) {}

  @Post(':id')
  async setDelay(@Param('id') tripId: string, @Body('delay') delay: number) {
    console.log(`Received tripId: ${tripId} with delay: ${delay}`);
    return this.delaysService.setDelay(tripId, delay);
  }

  @Delete(':id')
  async removeDelay(@Param('id') tripId: string) {
    return this.delaysService.removeDelay(tripId);
  }
}
