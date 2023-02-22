import express from "express"
import { makeTransfer, RegisterUser } from "../controller/user.controller"

const router = express.Router()

router.route("/register").post(RegisterUser)
router.route("/transfer/:id").post(makeTransfer)

export default router
