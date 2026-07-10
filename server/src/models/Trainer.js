import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: [true, "Trainer name is required"],
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
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
      trim: true
    },
    status: {
      type: String,
      enum: ["Available", "Assigned", "Inactive"],
      default: "Available"
    }
  },
  {
    timestamps: true
  }
);

const Trainer = mongoose.model("Trainer", trainerSchema);

export default Trainer;
