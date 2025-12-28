import mongoose, { Schema, models, model } from "mongoose";

const ExperienceSchema = new Schema(
  {
    company: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default models.Experience || model("Experience", ExperienceSchema);
