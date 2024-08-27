import { model, Schema } from 'mongoose';

const schema = new Schema({
    title: String,
    body: String,
    userId: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
})

export const entity = model("Threads", schema);