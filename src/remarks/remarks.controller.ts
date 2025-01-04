import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { RemarksService } from './remarks.service';
import { RemarkDto } from './dto/remark.dto';

@Controller('remarks')
export class RemarksController {
  constructor(private readonly remarksService: RemarksService) {}

  @Post(':trainNumber')
  async addRemark(
    @Param('trainNumber') trainNumber: string,
    @Body() remarkDto: RemarkDto,
  ) {
    return this.remarksService.addRemark(trainNumber, remarkDto.message);
  }

  @Patch(':trainNumber/:index')
  async editRemark(
    @Param('trainNumber') trainNumber: string,
    @Param('index') index: number,
    @Body() remarkDto: RemarkDto,
  ) {
    return this.remarksService.editRemark(
      trainNumber,
      index,
      remarkDto.message,
    );
  }

  @Delete(':trainNumber/:index')
  async removeRemark(
    @Param('trainNumber') trainNumber: string,
    @Param('index') index: number,
  ) {
    return this.remarksService.removeRemark(trainNumber, index);
  }
}
