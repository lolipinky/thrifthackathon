import cron from "node-cron";
import Contribution from "../models/contribution.model.js";

// Runs every day at 9am
export const startContributionReminder = () => {
  cron.schedule("0 9 * * *", async () => {
    try {
      const currentMonth = new Date().toISOString().slice(0, 7);

      const unpaidContributions = await Contribution.find({
        cycleMonth: currentMonth,
        status: "pending",
      })
        .populate("user", "fullName email")
        .populate("group", "name");

      if (!unpaidContributions.length) {
        console.log("✅ No unpaid contributions today");
        return;
      }

      unpaidContributions.forEach((contribution) => {
        console.log(`
🔔 REMINDER
User: ${contribution.user.fullName}
Email: ${contribution.user.email}
Group: ${contribution.group.name}
Amount: ₦${contribution.amount}
Cycle: ${contribution.cycleMonth}
        `);

        // 👇 Later you can plug in email / SMS / push notification
      });

    } catch (error) {
      console.error("❌ Contribution reminder error:", error.message);
    }
  });
};
