import { Module } from '@nestjs/common';
import { RemarksService } from './remarks.service';
import { RemarksController } from './remarks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Remark, RemarkSchema } from './remark.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Remark.name, schema: RemarkSchema }]),
  ],
  controllers: [RemarksController],
  providers: [RemarksService],
  exports: [RemarksService],
})
export class RemarksModule {}
