import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "../../../../lib/mongoose";
import Experience from "../../../../models/Experience";

type Params = { id: string };

export async function GET(
    _request: Request,
    { params }: { params: Params }
) {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid experience id" }, { status: 400 });
    }

    await connectToDatabase();

    const experience = await Experience.findById(id);

    if (!experience) {
        return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    return NextResponse.json(experience);
}

export async function PUT(
    request: Request,
    { params }: { params: Params }
) {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid experience id" }, { status: 400 });
    }

    const body = await request.json();
    await connectToDatabase();

    const updated = await Experience.findByIdAndUpdate(id, body, {
        new: true,          // return updated doc
        runValidators: true // enforce schema validation on update
    });

    if (!updated) {
        return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
}

export async function DELETE(
    _request: Request,
    { params }: { params: Params }
) {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid experience id" }, { status: 400 });
    }

    await connectToDatabase();

    const deleted = await Experience.findByIdAndDelete(id);

    if (!deleted) {
        return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    return NextResponse.json({ status: "success", deletedId: id });
}
