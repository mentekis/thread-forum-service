import { model, Schema } from 'mongoose';

const schema = new Schema({
    title: String,
    body: String,
})

export const entity = model("Threads", schema);