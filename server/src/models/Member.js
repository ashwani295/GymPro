import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: [true, "Member name is required"],
      trim: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: ""
    },
    phone: {
      type: String,
      trim: true,
      default: ""
    },
    membership: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Membership",
      default: null
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
      default: null
    },
    joinDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ["Active", "Pending", "Inactive"],
      default: "Active"
    }
  },
  {
    timestamps: true
  }
);

const Member = mongoose.model("Member", memberSchema);

export default Member;
