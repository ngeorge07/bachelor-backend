import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Delay, DelayDocument } from './delay.model';

@Injectable()
export class DelaysService {
  constructor(
    @InjectModel(Delay.name) private readonly delayModel: Model<DelayDocument>,
  ) {}

  async setDelay(tripId: string, delay: number): Promise<Delay> {
    const newDelay = new this.delayModel({ tripId, delay });
    return newDelay.save();
  }

  // Find a delay by tripId (or shortName if needed)
  async getDelayByTripId(tripId: string): Promise<Delay | null> {
    return this.delayModel.findOne({ tripId }).exec();
  }

  async removeDelay(tripId: string): Promise<any> {
    return this.delayModel.deleteOne({ tripId });
  }
}
