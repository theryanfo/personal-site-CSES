import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongoose";
import Project from "../../../models/Project";

export async function GET() {
    await connectToDatabase();
    const projects = await Project.find().sort({ startDate: -1 });
    return NextResponse.json(projects);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        await connectToDatabase();

        const project = await Project.create(body);
        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create project" },
            { status: 400 }
        );
    }
}
