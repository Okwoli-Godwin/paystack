import mongoose, { model, Document } from "mongoose";
import { WalletData } from "../Allinterface/Allinterface";

interface MainData extends WalletData, Document{}

const WalletSchema = new mongoose.Schema<WalletData>({
    Balance: {
        type: Number,
        
    },

    credit: {
        type: Number,
    },

    debit: {
        type: Number,
    },
},
{timestamps: true})


const walletModel =  model<MainData>("wallets", WalletSchema)
export default walletModel