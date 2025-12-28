import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Experience from "../../../models/Experience";

export async function GET() {
  await connectToDatabase();
  const experiences = await Experience.find();
  return NextResponse.json(experiences);
}
