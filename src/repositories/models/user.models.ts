import { model, Schema } from "mongoose";

const schema = new Schema({
    username: String,
});

export const entity = model("User", schema);