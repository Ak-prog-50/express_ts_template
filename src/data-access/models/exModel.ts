import mongoose, { InferSchemaType, Schema } from "mongoose";

const exSchema = new Schema({});

type Example = InferSchemaType<typeof exSchema>;

export default mongoose.model<Example>("Example", exSchema);
