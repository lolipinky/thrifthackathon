import Group from "../models/group.model.js";
import createUser from "../models/createAcc.js"; // User model

// Create a new thrift group
export const createGroup = async (req, res) => {
  try {
    const { name, amountPerMonth, cycleStart, cycleEnd, members } = req.body;

    // Validate required fields
    if (!name || !amountPerMonth || !cycleStart || !cycleEnd) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Validate and filter members
    let validMembers = [];
    if (members && Array.isArray(members)) {
      for (let userId of members) {
        // Check if user exists
        const userExists = await createUser.findById(userId);
        if (userExists) validMembers.push(userId);
      }
    }

    // Create the group
    const newGroup = await Group.create({
      name,
      amountPerMonth,
      cycleStart,
      cycleEnd,
      members: validMembers,
    });

    return res.status(201).json(newGroup);
  } catch (error) {
    console.error("CREATE GROUP ERROR:", error.message);
    return res.status(500).json({
      message: "Failed to create group",
      error: error.message,
    });
  }
};

// Get all groups
export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find()
      .populate("members", "fullName email phoneNumber")
      .sort({ createdAt: -1 });

    return res.json(groups);
  } catch (error) {
    console.error("GET GROUPS ERROR:", error.message);
    return res.status(500).json({ message: "Failed to fetch groups", error: error.message });
  }
};

// Get a single group by ID
export const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate("members", "fullName email phoneNumber");

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    return res.json(group);
  } catch (error) {
    console.error("GET GROUP ERROR:", error.message);
    return res.status(500).json({ message: "Failed to fetch group", error: error.message });
  }
};

// Add a member to a group
export const addMember = async (req, res) => {
  try {
    const { groupId, userId } = req.body;

    // Check if group exists
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // Validate user
    const user = await createUser.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Add member if not already in group
    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
    }

    return res.json(group);
  } catch (error) {
    console.error("ADD MEMBER ERROR:", error.message);
    return res.status(500).json({ message: "Failed to add member", error: error.message });
  }
};

// Remove a member from a group
export const removeMember = async (req, res) => {
  try {
    const { groupId, userId } = req.body;

    // Check if group exists
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // Remove member
    group.members = group.members.filter((member) => member.toString() !== userId);
    await group.save();

    return res.json(group);
  } catch (error) {
    console.error("REMOVE MEMBER ERROR:", error.message);
    return res.status(500).json({ message: "Failed to remove member", error: error.message });
  }
};
