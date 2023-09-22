const mongooose = require('mongoose');
const User = require('./User');

const { Schema } = mongooose;
let courseNo = 1;

const courseSchema = new Schema({
    // id: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     default: `Course${courseNo}`
    // },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    courseImg: {
        type: String,
        required: true,
        unique: true,
        default: 'null'
    },
    price: {
        type: Number,
        required: true
    },
    sections: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Course = mongooose.model('Course', courseSchema);

module.exports = Course;