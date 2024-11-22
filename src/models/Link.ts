import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ILink extends Document {
  userId: ObjectId;
  normalLink: string;
  shorterLink: string;
}

const LinkSchema = new Schema<ILink>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    normalLink: {
      type: String,
      required: true,
      trim: true,
    },
    shorterLink: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true } // Automatically includes `createdAt` and `updatedAt`
);

export const Link = mongoose.model<ILink>("Link", LinkSchema);
