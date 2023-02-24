const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
})
// static signup function
userSchema.statics.signup = async function (email, password) {

    // validator 
    if (!email || !password) {
        throw Error('جميع الحقول مطلوبة')
    }
    if (!validator.isEmail(email)) {
        throw Error('يرجى ادخال بريد صحيح')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('يرجى ادخال كلمة مرور قوية')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('البريد موجود مسبقا')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

// static login function
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('جميع الحقول مطلوبة')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('البريد غير صحيح')
    }
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('كلمة المرور غير صحيحة')
    }

    return user

}


module.exports = mongoose.model('User', userSchema)