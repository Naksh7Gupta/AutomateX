import mongoose from "mongoose";

const StatsSchema = new mongoose.Schema({
  source: { type: String, unique: true },
  count: { type: Number, default: 0 },
});

export default mongoose.models.Stats || mongoose.model("Stats", StatsSchema);
