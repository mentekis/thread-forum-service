import { Types } from "mongoose";
import { IUser } from "./user.dto";

export interface threadRequest {
    title: string;
    body: string;
    userId?: string;
    user?: string | null;
}

export interface IThreadResponse {
    _id: Types.ObjectId;
    title: string;
    body: string;
    user?: IUser | null;
}