import { model, Schema } from 'mongoose';

const schema = new Schema({
    title: String,
    body: String,
    user: { type: Schema.Types.String, ref: "User" },
})

export const entity = model("Threads", schema);