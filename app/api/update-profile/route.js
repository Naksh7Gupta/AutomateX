import User from "@/app/models/User";
import { connectDB } from "@/app/connectDB";

export async function POST(req) {
  await connectDB();

  try {
    const { email, name, bio } = await req.json();

    const user = await User.findOneAndUpdate(
      { email },
      { name, bio },
      { new: true }
    );

    return Response.json({ success: true, user });
  } catch (error) {
    return Response.json({ success: false, message: error.message });
  }
}
