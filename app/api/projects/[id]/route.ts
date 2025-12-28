import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "../../../../lib/mongoose";
import Project from "../../../../models/Project";

type Params = { id: string };

export async function GET(
    _request: Request,
    { params }: { params: Params }
) {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
    }

    await connectToDatabase();

    const project = await Project.findById(id);

    if (!project) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
}

export async function PUT(
    request: Request,
    { params }: { params: Params }
) {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
    }

    const body = await request.json();
    await connectToDatabase();

    const updated = await Project.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    });

    if (!updated) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
}

export async function DELETE(
    _request: Request,
    { params }: { params: Params }
) {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
    }

    await connectToDatabase();

    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ status: "success", deletedId: id });
}
