import createUser from "../models/createAcc.js";
import Group from "../models/group.model.js";
import Payment from "../models/payment.model.js";
import mongoose from "mongoose";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await createUser.countDocuments();
    const totalGroups = await Group.countDocuments();
    const totalPayments = await Payment.countDocuments({ status: "success" });

    const totalAmountResult = await Payment.aggregate([
      { $match: { status: "success" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const totalAmountCollected =
      totalAmountResult.length > 0 ? totalAmountResult[0].total : 0;

    return res.json({
      totalUsers,
      totalGroups,
      totalPayments,
      totalAmountCollected,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Dashboard fetch failed" });
  }
};


export const getAllPayments = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }

    const payments = await Payment.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Payment.countDocuments(query);

    return res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      payments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch payments" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = {};
    if (status) query.status = status;

    const orders = await Payment.find(query)
      .populate("user", "fullName email phoneNumber")
      .populate("group", "name amountPerMonth")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Payment.countDocuments(query);

    return res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Get contribution summary for all groups
export const getGroupContributions = async (req, res) => {
  try {
    // Fetch all groups and populate members using the correct ref
    const groups = await Group.find().populate("members", "fullName email");

    const summary = await Promise.all(
      groups.map(async (group) => {
        // Get all successful payments for this group
        const payments = await Payment.find({
          group: group._id,
          status: "success",
        }).populate("user", "fullName email"); // make sure user in Payment uses createUser

        // IDs of users who have paid
        const paidUserIds = payments.map((p) => p.user._id.toString());

        // Members who haven’t paid yet
        const unpaidMembers = group.members.filter(
          (member) => !paidUserIds.includes(member._id.toString())
        );

        return {
          groupId: group._id,
          groupName: group.name,
          status: group.status,
          totalAmountCollected: payments.reduce((sum, p) => sum + p.amount, 0),
          totalMembers: group.members.length,
          paidMembers: payments.map((p) => ({
            id: p.user._id,
            name: p.user.fullName,
            email: p.user.email,
            amountPaid: p.amount,
            reference: p.reference,
          })),
          unpaidMembers: unpaidMembers.map((u) => ({
            id: u._id,
            name: u.fullName,
            email: u.email,
          })),
        };
      })
    );

    return res.status(200).json(summary);
  } catch (error) {
    console.error("GROUP CONTRIBUTIONS ERROR:", error.message);
    return res.status(500).json({
      message: "Failed to fetch group contributions",
      error: error.message,
    });
  }
};

