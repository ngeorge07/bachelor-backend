import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Remark, RemarkDocument } from './remark.model';
import { Model } from 'mongoose';

@Injectable()
export class RemarksService {
  constructor(
    @InjectModel(Remark.name)
    private readonly remarkModel: Model<RemarkDocument>,
  ) {}

  async getRemarkByTrainNumber(trainNumber: string) {
    return this.remarkModel.findOne({ trainNumber }).exec();
  }

  async addRemark(trainNumber: string, message: string) {
    const remark = await this.remarkModel.findOne({ trainNumber }).exec();

    if (!remark) {
      const newRemark = new this.remarkModel({
        trainNumber,
        messages: [message],
      });
      return newRemark.save();
    }

    remark.messages.push(message);
    remark.updatedAt = new Date();
    return remark.save();
  }

  async editRemark(trainNumber: string, index: number, message: string) {
    const remark = await this.remarkModel.findOne({ trainNumber }).exec();
    if (!remark) {
      throw new NotFoundException(
        `Remarks for train ${trainNumber} not found.`,
      );
    }

    if (index < 0 || index >= remark.messages.length) {
      throw new BadRequestException(`Invalid message index ${index}.`);
    }

    remark.messages[index] = message;
    remark.updatedAt = new Date();
    return remark.save();
  }

  async removeRemark(trainNumber: string, index: number) {
    const remark = await this.remarkModel.findOne({ trainNumber }).exec();
    if (!remark) {
      throw new NotFoundException(
        `Remarks for train ${trainNumber} not found.`,
      );
    }

    if (index < 0 || index >= remark.messages.length) {
      throw new BadRequestException(`Invalid message index ${index}.`);
    }

    remark.messages.splice(index, 1);
    remark.updatedAt = new Date();

    if (remark.messages.length === 0) {
      // If no messages are left, delete the document
      await this.remarkModel.deleteOne({ trainNumber }).exec();
      return {
        message: 'Remark removed successfully. No more messages left.',
      };
    } else {
      // Otherwise, save the updated remark
      await remark.save();
      return {
        message: 'Remark removed successfully.',
      };
    }
  }
}
