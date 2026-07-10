import WorkoutPlan from "../models/WorkoutPlan.js";

export async function getWorkoutPlans(req, res, next) {
  try {
    const workouts = await WorkoutPlan.find({ owner: req.user._id })
      .populate("member", "name")
      .populate("trainer", "name specialization")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      workouts
    });
  } catch (error) {
    next(error);
  }
}

export async function createWorkoutPlan(req, res, next) {
  try {
    const { member, trainer, goal, days, notes } = req.body;
    const normalizedDays = Array.isArray(days)
      ? days
      : String(days || "")
          .split(",")
          .map((day) => day.trim())
          .filter(Boolean);

    const workout = await WorkoutPlan.create({
      owner: req.user._id,
      member,
      trainer: trainer || null,
      goal,
      days: normalizedDays,
      notes
    });

    const populatedWorkout = await WorkoutPlan.findById(workout._id)
      .populate("member", "name")
      .populate("trainer", "name specialization");

    res.status(201).json({
      success: true,
      workout: populatedWorkout
    });
  } catch (error) {
    next(error);
  }
}
