import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: [true, "Membership name is required"],
      trim: true
    },
    price: {
      type: Number,
      required: [true, "Membership price is required"],
      min: 0
    },
    durationMonths: {
      type: Number,
      required: [true, "Duration is required"],
      min: 1
    },
    description: {
      type: String,
      trim: true,
      default: ""
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    }
  },
  {
    timestamps: true
  }
);

const Membership = mongoose.model("Membership", membershipSchema);

export default Membership;
