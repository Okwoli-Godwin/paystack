import mongoose, { model, Document } from "mongoose";
import { historyData } from "../Allinterface/Allinterface";

interface MainData extends historyData, Document{}

const historySchema = new mongoose.Schema<historyData>({
    message: {
        type: String,
    },

    transactionreference: {
        type: Number,
    },

    transactionType: {
        type: Boolean,
    },
},
{timestamps: true})


export default model<MainData>("history", historySchema)