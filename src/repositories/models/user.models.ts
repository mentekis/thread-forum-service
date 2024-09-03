import { model, Schema } from "mongoose";

const schema = new Schema({
    name: String,
});

export const entity = model("User", schema);