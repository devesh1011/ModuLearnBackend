const Course = require('../models/Course');


async function createCourse(req, res) {
    const { title, description, instructor, courseImg, price, sections, duration, language } = req.body;

    try {
        const newCourse = new Course({
            title,
            description,
            instructor,
            courseImg,
            price,
            sections,
            duration,
            language
        })

        newCourse.save()
        return res.status(201).json({ "Message": "Your course has been added successfully" });
    } catch (error) {
        res.status(401).json({ "Message": "Internal Server Error" });
    }
}

async function getAllCourses(req, res) {
    try {
        const courses = await Course.find({});
        res.json(courses);
    } catch (error) {
        res.status(500).json({ "message": "Internal Server Error" })
    }
}

async function getCourseById(req, res) {
    const courseId = req.params.id;

    try {
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({course});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


async function updateCourseDetails(req, res) {
    const courseId = req.params.id;

    try {
        const course = await Course.findById(courseId);

        // if (!course) {
        //     return res.status(404).json({ message: 'Course not found' });
        // }

        res.status(200).json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function deleteCourse(req, res) {
    const courseId = req.params.id;

    try {
        const course = await Course.findById(courseId);

        if (course.instructor.username !== req.username) {
            return res.status(403).json({ message: 'You are not allowed to delete this course' });
        }

        await Course.findByIdAndDelete(courseId);
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    getAllCourses, getCourseById, updateCourseDetails, deleteCourse, createCourse
}