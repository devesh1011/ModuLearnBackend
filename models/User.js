const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username cannot be blank"],
        unique: true,
        min: [8, 'Username must be aleast 8 characters']
    },
    email: {
        type: String,
        required: [true, "Email cannot be blank"],
        unique: [true, "Email already exists. Please try with other email address"],
        validate: {
            validator: function (v) {
                return /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/.test(v);
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    password: {
        type: String,
        required: [true, "Password cannot be blank"],
        validate: {
            validator: function (v) {
                return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/.test(v);
            },
            message: props => `${props.value} is not a valid password format`
        }
    },
    token: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;