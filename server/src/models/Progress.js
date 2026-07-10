import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: [true, "Member is required"]
    },
    date: {
      type: Date,
      required: [true, "Progress date is required"]
    },
    weight: {
      type: Number,
      min: 0,
      default: 0
    },
    bodyFat: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    notes: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;
