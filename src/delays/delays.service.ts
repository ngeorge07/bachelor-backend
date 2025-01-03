import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Delay, DelayDocument } from './delay.model';

@Injectable()
export class DelaysService {
  constructor(
    @InjectModel(Delay.name) private readonly delayModel: Model<DelayDocument>,
  ) {}

  // Check for an existing delay and update or create a new one
  async setDelay(tripId: string, delay: number): Promise<Delay> {
    if (delay === 0) {
      throw new BadRequestException('Delay cannot be set to 0.');
    }

    const existingDelay = await this.delayModel.findOne({ tripId }).exec();

    if (existingDelay) {
      // If delay exists, update it
      existingDelay.delay = delay;
      return existingDelay.save();
    } else {
      // If delay doesn't exist, create a new one
      const newDelay = new this.delayModel({ tripId, delay });
      return newDelay.save();
    }
  }

  // Find a delay by tripId (or shortName if needed)
  async getDelayByTripId(tripId: string): Promise<Delay | null> {
    return this.delayModel.findOne({ tripId }).exec();
  }

  async removeDelay(tripId: string): Promise<string> {
    const existingDelay = await this.delayModel.findOne({ tripId }).exec();

    if (existingDelay) {
      await this.delayModel.deleteOne({ tripId });
      return 'Delay removed successfully.';
    } else {
      // If no delay found, throw a NotFoundException with a custom message
      throw new NotFoundException("This train doesn't have a delay.");
    }
  }
}
