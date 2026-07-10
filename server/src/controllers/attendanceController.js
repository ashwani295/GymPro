import Attendance from "../models/Attendance.js";

function normalizeDate(dateValue) {
  const date = dateValue ? new Date(dateValue) : new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

export async function getAttendance(req, res, next) {
  try {
    const query = { owner: req.user._id };

    if (req.query.date) {
      query.date = normalizeDate(req.query.date);
    }

    const attendance = await Attendance.find(query)
      .populate("member", "name status")
      .sort({ date: -1, createdAt: -1 });

    res.json({
      success: true,
      attendance
    });
  } catch (error) {
    next(error);
  }
}

export async function markAttendance(req, res, next) {
  try {
    const { member, date, status } = req.body;

    const attendance = await Attendance.findOneAndUpdate(
      {
        owner: req.user._id,
        member,
        date: normalizeDate(date)
      },
      {
        owner: req.user._id,
        member,
        date: normalizeDate(date),
        status
      },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    ).populate("member", "name status");

    res.json({
      success: true,
      attendance
    });
  } catch (error) {
    next(error);
  }
}
