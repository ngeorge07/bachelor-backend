import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RemarkDocument = Remark & Document;

@Schema()
export class Remark {
  @Prop({ required: true })
  trainNumber: string; // Reference to the train

  @Prop({ type: [String], default: [] })
  messages: string[]; // Array of remarks

  @Prop({ default: Date.now })
  createdAt: Date; // Timestamp for when the remark was created

  @Prop()
  updatedAt?: Date; // Timestamp for when the remark was last updated
}

export const RemarkSchema = SchemaFactory.createForClass(Remark);
