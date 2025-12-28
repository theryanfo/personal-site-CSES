import mongoose, { Schema, models, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    projectName: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String, required: true, trim: true },
    deploymentLink: { type: String, trim: true },
    githubLink: { type: String, trim: true },
  },
  { timestamps: true }
);

export default models.Project || model("Project", ProjectSchema);
