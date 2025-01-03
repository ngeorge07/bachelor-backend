import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DelaySchema, Delay } from './delay.model';
import { DelaysService } from './delays.service';
import { DelaysController } from './delays.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Delay.name, schema: DelaySchema }]), // Register the Delay model
  ],
  controllers: [DelaysController],
  providers: [DelaysService],
  exports: [DelaysService], // Export the service so it can be used in other modules
})
export class DelaysModule {}
