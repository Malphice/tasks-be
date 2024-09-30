import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
