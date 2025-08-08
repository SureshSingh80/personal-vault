import { dbConnect } from "@/lib/dbConnect";
import Users from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();
    const { clerkId, username, email } = await request.json();

    if (!clerkId || !username || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // check if already exist user
    const existingUser = await Users.findOne({
      $or: [{ clerkId }, { email }],
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "user already exist",
          user: existingUser,
        },
        { status: 200 }
      );
    }
    // user not found , creating new users
    const newUser = await Users.create({
      clerkId,
      username,
      email,
    });

    return NextResponse.json(
      {
        message: "User creted succesfully",
        user: newUser,
      },
      { status: 200 }
    );

    
  } catch (error) {
    console.log("user authentication error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
