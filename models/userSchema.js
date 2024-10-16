const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Name Required!"]
    },
    email: {
        type: String,
        required: [true, "Email Required!"],
        unique: [true, "Already have an account with this email"],

    },
    phone: {
        type: String,
        required: [true, "Phone number Required!"]
    },
    aboutMe: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "Password Required!"],
        minLength: [8, "Password must contain at least 8 characters!"],
        select: false
    },
    avtar: {
        public_id: String,
        url: String
    },
    resume: {
        public_id: String,
        url: String,
    },
    portfolioUrl: String,
    githubUrl: String,
    instagramUrl: String,
    facebookUrl: String,
    twitterUrl: String,
    linkedInUrl: String,
    resetPasswordToken: String,
    resetPasswordExpired: Date,
})


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const hashedPassword = await bcrypt.hash(this.password, 10)

    this.password = hashedPassword
    next()
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateJsonWebToken = async function () {
    return await jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
        expiresIn: '10d'
    })
}

userSchema.methods.getResetToken = async function () {
    const resetToken = crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpired = Date.now() + 15 * 60 * 1000
    return resetToken
}

module.exports = mongoose.model("User", userSchema)