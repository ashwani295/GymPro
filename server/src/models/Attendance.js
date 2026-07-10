import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
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
      required: [true, "Attendance date is required"]
    },
    status: {
      type: String,
      enum: ["Present", "Absent"],
      default: "Present"
    }
  },
  {
    timestamps: true
  }
);

attendanceSchema.index({ owner: 1, member: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
