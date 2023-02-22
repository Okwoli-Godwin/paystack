import userModel from "../model/user.model";
import {Request, Response} from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import walletModel from "../model/WalletModel";
import mongoose from "mongoose";
import Historymodel from "../model/Historymodel";


export const RegisterUser = async(req: Request, res: Response) => {
    try {
        const {name, email, password, userName, phoneNumber} = req.body

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const dater = Date.now()


        const generateNumber = Math.floor(Math.random() * 78) + dater;

        const register = await userModel.create({
            name,
            email,
            password: hash,
            phoneNumber: `234${phoneNumber}`,
            userName,
            verified: true,
            accountNumber: generateNumber
        })

        const createWallet = await walletModel.create({
            _id: register?._id,
            Balance: 1000,
            credit: 0,
            debit: 0

        })

        register?.wallet.push(new mongoose.Types.ObjectId(createWallet?._id))

        register.save()

        res.status(200).json({
            message: "Successfully created",
            data: register,
            token: jwt.sign({_id: register._id}, "dgdgf-juj3445-bjdjhdsj7")
        })
    } catch (error) {
        return res.status(400).json({
            message: 'an error occured',
            data: error
        })
    }
}

export const makeTransfer = async(req: Request, res: Response) => {
    try {

        //create transaction refrence
        const ref = Math.floor(Math.random() * 70) * 4564

        const {accountNumber, amount} = req.body

        //Receiver account

        const getReceiver = await userModel.findOne({accountNumber})
        const getReceiverWallet = await walletModel.findById(getReceiver?._id)

        //Sender Account
        const getUser = await userModel.findById(req.params.userID)
        const getuserWallet = await walletModel.findById(req.params.walletID)

        //check if there is a user and a receiver account

        if (getUser && getReceiver) {
            //check if sender has enough fund to send
            if (amount > getuserWallet?.Balance!) {
                return res.status(400).json({
                    message: "insufficient fund"
                })
            } else {
                //updating the sender wallet
                await walletModel.findByIdAndUpdate(getuserWallet?.id, {
                    Balance: getuserWallet?.Balance! - amount,
                    credit: 0,
                    debit: amount
                })

                //create sender transaction history
                const createHistorySender = await Historymodel.create({
                    message: `you have sent ${amount} to ${getReceiver.name}`,
                    transactionType: "debit",
                    transactionreference: ref
                })

                getUser?.history.push(new mongoose.Types.ObjectId(createHistorySender?.id))
                getUser.save()

                //updating Receivers wallet
                await walletModel.findByIdAndUpdate(getReceiverWallet?._id, {
                    balance: getReceiverWallet?.Balance + amount,
                    credit: amount,
                    debit: 0
                })
                // create receiver transaction history

                const createReceiverHistory = await Historymodel.create({
                    message: `your account has been credited with ${amount} from ${getUser}`,
                    transactionType: "credit",
                    transactionreference: ref
                })

                getReceiver?.history.push( new mongoose.Types.ObjectId(createReceiverHistory?.id))
                getReceiver?.save()
            }
        } else {
            return res.status(400).json({
                message: "user not found"
            })
        }
        
    } catch (error) {
        return res.status(400).json({
            message: "An error occured",
            data: error
        })
    }
}

export const users = async (req: Request, res: Response) => {
    try {
        const user = await userModel.find()
        
        return res.status(200).json({
            message: "datas gotten successfully",
            data: user
        })
    } catch (error) {
        return res.status(400).json({
            message: "An error occured",
            data: error
        })
    }
}