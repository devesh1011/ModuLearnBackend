const express = require('express');
const jwt = require('../middleware/verifyToken');

const courseRouter = express.Router();
const {
    getAllCourses,
    getCourseById, updateCourseDetails, deleteCourse, createCourse
} = require('../controllers/courseController')

courseRouter
    .get('/all-courses', getAllCourses)
    .get('/:id', getCourseById)
    .post('/create-course',jwt.verifyToken , createCourse)
    .patch('/update/:id',jwt.verifyToken, updateCourseDetails)
    .delete('/delete/:id',jwt.verifyToken, deleteCourse)

module.exports = courseRouter