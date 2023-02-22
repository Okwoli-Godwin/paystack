import mongoose, { model, Document } from "mongoose";
import { UserData } from "../Allinterface/Allinterface";

interface MainData extends UserData, Document{}

const UserSchema = new mongoose.Schema<MainData>({
    name: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: Number,
        required: true
    },

    accountNumber: {
        type: Number,
    },

    verified: {
        type: Boolean,
    },

    wallet: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "wallets"
    }],

    history: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "history"
        }
    ]
},
{timestamps: true}
)

export default model<MainData>("UserSchema", UserSchema)