import ConnectToDB from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(request: Request) {
  await ConnectToDB();
  try {
    const { username, code } = await request.json();
    const decodedusername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedusername });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    if (user.verifyCode !== code) {
      return Response.json(
        {
          success: false,
          message: "Invalid code",
        },
        { status: 400 }
      );
    }
    if (user.verifyCodeExpiry < new Date()) {
      return Response.json(
        {
          success: false,
          message: "Code expired",
        },
        { status: 400 }
      );
    }
    user.isVerified = true;
    await user.save();
    return Response.json(
      {
        success: true,
        message: "User verified",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(`Error Veryfing Code: ${error}`);
    return Response.json(
      {
        success: false,
        message: "Error verifying code",
      },
      { status: 500 }
    );
  }
}
