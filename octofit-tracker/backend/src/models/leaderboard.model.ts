import { InferSchemaType, Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalPoints: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true, default: 'weekly' },
  },
  {
    timestamps: true,
  },
);

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;
export const LeaderboardModel = model('Leaderboard', leaderboardSchema);
