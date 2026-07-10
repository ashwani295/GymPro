import Member from "../models/Member.js";
import Trainer from "../models/Trainer.js";

function memberQuery(owner) {
  return Member.find({ owner }).populate("membership", "name price durationMonths").populate("trainer", "name specialization status");
}

export async function getMembers(req, res, next) {
  try {
    const members = await memberQuery(req.user._id).sort({ createdAt: -1 });

    res.json({
      success: true,
      members
    });
  } catch (error) {
    next(error);
  }
}

export async function createMember(req, res, next) {
  try {
    const { name, email, phone, membership, trainer, joinDate, status } = req.body;

    const member = await Member.create({
      owner: req.user._id,
      name,
      email,
      phone,
      membership: membership || null,
      trainer: trainer || null,
      joinDate,
      status
    });

    if (trainer) {
      await Trainer.findOneAndUpdate({ _id: trainer, owner: req.user._id }, { status: "Assigned" });
    }

    const populatedMember = await Member.findById(member._id)
      .populate("membership", "name price durationMonths")
      .populate("trainer", "name specialization status");

    res.status(201).json({
      success: true,
      member: populatedMember
    });
  } catch (error) {
    next(error);
  }
}

export async function assignTrainer(req, res, next) {
  try {
    const { trainer } = req.body;

    const member = await Member.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { trainer: trainer || null },
      { new: true, runValidators: true }
    )
      .populate("membership", "name price durationMonths")
      .populate("trainer", "name specialization status");

    if (!member) {
      res.status(404);
      throw new Error("Member not found");
    }

    if (trainer) {
      await Trainer.findOneAndUpdate({ _id: trainer, owner: req.user._id }, { status: "Assigned" });
    }

    res.json({
      success: true,
      member
    });
  } catch (error) {
    next(error);
  }
}
