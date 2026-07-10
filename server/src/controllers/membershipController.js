import Membership from "../models/Membership.js";

export async function getMemberships(req, res, next) {
  try {
    const memberships = await Membership.find({ owner: req.user._id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      memberships
    });
  } catch (error) {
    next(error);
  }
}

export async function createMembership(req, res, next) {
  try {
    const { name, price, durationMonths, description, status } = req.body;

    const membership = await Membership.create({
      owner: req.user._id,
      name,
      price,
      durationMonths,
      description,
      status
    });

    res.status(201).json({
      success: true,
      membership
    });
  } catch (error) {
    next(error);
  }
}
