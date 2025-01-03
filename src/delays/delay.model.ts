import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DelayDocument = Delay & Document;

@Schema()
export class Delay {
  @Prop({ required: true })
  tripId: string;

  @Prop({ default: 0 })
  delay: number;
}

export const DelaySchema = SchemaFactory.createForClass(Delay);
