import { InferSchemaType, Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    durationMinutes: { type: Number, required: true, min: 5 },
    targetMuscleGroup: { type: String, required: true, trim: true },
    equipmentNeeded: [{ type: String, trim: true }],
  },
  {
    timestamps: true,
  },
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;
export const WorkoutModel = model('Workout', workoutSchema);
