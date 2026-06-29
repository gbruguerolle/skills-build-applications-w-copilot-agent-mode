import { InferSchemaType, Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      required: true,
      enum: ['run', 'bike', 'swim', 'strength', 'yoga', 'hike'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    happenedAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;
export const ActivityModel = model('Activity', activitySchema);
