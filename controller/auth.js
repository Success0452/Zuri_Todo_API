const User = require("../model/auth")
const Otp = require("../model/otp")
const { StatusCodes } = require("http-status-codes")
const generateToken = require("../middleware/generate_token")
const mailer = require("../util/mailer")
const bcrypt = require("bcryptjs")

const CreateUser = async(req, res) => {
    const { fullname, email, password } = req.body

    const user = new User({ fullname, email, password })

    if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Unable to create user" })
    }

    user.save(async function(error, result) {
        if (error) console.log(error)
        console.log(email)
        SendOtp(result, res)
    })

}

const SendOtp = async({ _id, email }, res) => {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`
    console.log(email)
    mailer.send(email, "Confirmation of Todo Account", `<p>Welcome to Todo Api, use the otp provided below to verify your account. Here is the otp <b>${otp}</b></p>`)

    const salt = await bcrypt.genSalt(10)
    const hashedOtp = await bcrypt.hash(otp, salt)

    const create = new Otp({ id: _id, otp: hashedOtp, createdAt: Date.now(), expiresAt: Date.now() + 3600000 })

    create.save()

    res.status(200).json({
        msg: "verification email sent",
        id: _id,
        success: true
    })
}

const VerifyOtp = async(req, res) => {
    const { id, otp } = req.body

    const find = await Otp.findOne({ id })

    const { expiresAt } = find.expiresAt

    if (!find) {
        res.status(400).json({
            msg: "unable to find user"
        })
    }

    if (expiresAt < Date.now()) {
        await Otp.deleteOne({ id: id })
        res.status(400).json({
            msg: "otp expires, try requesting again"
        })
    }

    const verify = await bcrypt.compare(otp, find.otp)

    if (!verify) {
        res.status(400).json({
            msg: "incorrect otp provided"
        })
    }

    await User.updateOne({ _id: id }, { verified: true })
    await Otp.deleteOne({ id: id })

    res.status(200).json({
        msg: "Account verified, proceed to login",
        success: true
    })
}

const Login = async(req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })


    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Unable to retrieve user" })
    }

    const verify = user.Compare(password)

    if (!verify) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Unable to verify password" })
    }

    console.log(user._id)

    res.status(StatusCodes.ACCEPTED).json({
        success: true,
        msg: "account logged in successfully",
        token: generateToken(user._id)
    })
}



module.exports = {
    CreateUser,
    VerifyOtp,
    Login
}