export const generateGroupContributions = async (req, res) => {
  try {
    const { groupId, cycleMonth } = req.body;

    if (!groupId || !cycleMonth) {
      return res.status(400).json({ message: "groupId and cycleMonth are required" });
    }

    const group = await Group.findById(groupId).populate("members");
    if (!group) return res.status(404).json({ message: "Group not found" });

    const created = [];

    for (const member of group.members) {
      const exists = await Contribution.findOne({
        user: member._id,
        group: groupId,
        cycleMonth,
      });

      if (exists) continue;

      const contribution = await Contribution.create({
        user: member._id,
        group: groupId,
        amount: group.amountPerMonth,
        cycleMonth,
      });

      created.push(contribution);
    }

    return res.status(201).json({
      message: "Monthly contributions generated",
      count: created.length,
      contributions: created,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate contributions",
      error: error.message,
    });
  }
};
