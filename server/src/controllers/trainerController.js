import Trainer from "../models/Trainer.js";

export async function getTrainers(req, res, next) {
  try {
    const trainers = await Trainer.find({ owner: req.user._id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      trainers
    });
  } catch (error) {
    next(error);
  }
}

export async function createTrainer(req, res, next) {
  try {
    const { name, email, phone, specialization, status } = req.body;

    const trainer = await Trainer.create({
      owner: req.user._id,
      name,
      email,
      phone,
      specialization,
      status
    });

    res.status(201).json({
      success: true,
      trainer
    });
  } catch (error) {
    next(error);
  }
}
