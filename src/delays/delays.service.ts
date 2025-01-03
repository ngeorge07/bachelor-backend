import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Delay, DelayDocument } from './delay.model';

@Injectable()
export class DelaysService {
  constructor(
    @InjectModel(Delay.name) private readonly delayModel: Model<DelayDocument>,
  ) {}

  // Check for an existing delay and update or create a new one. Delays are set in minutes.
  async setDelay(trainNumber: string, delay: number): Promise<Delay> {
    const existingDelay = await this.delayModel.findOne({ trainNumber }).exec();

    if (existingDelay) {
      // If delay exists, update it
      existingDelay.delay = delay;
      return existingDelay.save();
    } else {
      // If delay doesn't exist, create a new one
      const newDelay = new this.delayModel({ trainNumber, delay });
      return newDelay.save();
    }
  }

  // Find a delay by trainNumber (or shortName if needed)
  async getDelayByTrainNumber(trainNumber: string): Promise<Delay | null> {
    return this.delayModel.findOne({ trainNumber }).exec();
  }

  async removeDelay(trainNumber: string): Promise<string> {
    const existingDelay = await this.delayModel.findOne({ trainNumber }).exec();

    if (existingDelay) {
      await this.delayModel.deleteOne({ trainNumber });
      return 'Delay removed successfully.';
    } else {
      // If no delay found, throw a NotFoundException with a custom message
      throw new NotFoundException("This train doesn't have a delay.");
    }
  }
}
