import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongoose";
import Experience from "../../../models/Experience";

export async function GET() {
    await connectToDatabase();
    const experiences = await Experience.find().sort({ startDate: -1 });
    return NextResponse.json(experiences);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        await connectToDatabase();

        const experience = await Experience.create(body);
        return NextResponse.json(experience, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create experience" },
            { status: 400 }
        );
    }
}
