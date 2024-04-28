import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import ConnectToDB from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { User } from "next-auth";

export async function GET(request: Request) {
  await ConnectToDB();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !user) {
    return Response.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const userId = user?._id;
  try {
    const user = await UserModel.aggregate([
      {
        $match: {
          id: userId,
        },
      },
      { $unwind: "messages" },
      { $sort: { "messages.createdAt": -1 } },
    ]);

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 401 }
      );
    }
    return Response.json(
      {
        success: true,
        messages: user[0].messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
