import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "createUser",
      },
    ],
    amountPerMonth: {
      type: Number,
      required: true,
    },
    cycleStart: {
      type: Date,
      required: true,
    },
    cycleEnd: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "completed", "inactive"],
      default: "active",
    },
    
    lastCollectedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "createUser",
    },
}, {timestamps: true}
)

const GROUP = mongoose.model("GROUP", groupSchema)
export default GROUP