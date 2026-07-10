import Progress from "../models/Progress.js";

function normalizeDate(dateValue) {
  const date = dateValue ? new Date(dateValue) : new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

export async function getProgress(req, res, next) {
  try {
    const query = { owner: req.user._id };

    if (req.query.member) {
      query.member = req.query.member;
    }

    const progress = await Progress.find(query)
      .populate("member", "name")
      .sort({ date: 1 });

    res.json({
      success: true,
      progress
    });
  } catch (error) {
    next(error);
  }
}

export async function createProgress(req, res, next) {
  try {
    const { member, date, weight, bodyFat, notes } = req.body;

    const progress = await Progress.create({
      owner: req.user._id,
      member,
      date: normalizeDate(date),
      weight,
      bodyFat,
      notes
    });

    const populatedProgress = await Progress.findById(progress._id).populate("member", "name");

    res.status(201).json({
      success: true,
      progress: populatedProgress
    });
  } catch (error) {
    next(error);
  }
}
