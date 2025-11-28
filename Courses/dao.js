import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
import enrollements from "../Database/enrollments.js"
export default function CoursesDao() {
    async function findAllCourses() {
        //return db.courses;
        // const courses = await model.find({}, { name: 1, description: 1 })
        // console.log("Courses data:", JSON.stringify(courses, null, 2));
        // return courses;
        return await model.find({}, { name: 1, description: 1 });
    }
    async function findCoursesForEnrolledUser(userId) {
        // const { courses, enrollments } = db;
        const courses = await model.find({}, { name: 1, description: 1 });
        const enrolledCourses = courses.filter((course) =>
            enrollements.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
        return enrolledCourses;
    }
    async function findCourseById(courseIds){
        return model.find({ _id: { $in: courseIds } })
    }
    function createCourse(course) {
        const newCourse = { ...course, _id: uuidv4() };
        return model.create(newCourse);
        // db.courses = [...db.courses, newCourse];
        // return newCourse;
    }
    function deleteCourse(courseId) {
        // const { courses, enrollments } = db;
        //const { enrollments } = db;
        //db.courses = courses.filter((course) => course._id !== courseId);
        // db.enrollments = enrollments.filter(
        //     (enrollment) => enrollment.course !== courseId
        // );
        return model.deleteOne({ _id: courseId });
    }
    function updateCourse(courseId, courseUpdates) {
        return model.updateOne({ _id: courseId }, { $set: courseUpdates });
        // const { courses } = db;
        // const course = courses.find((course) => course._id === courseId);
        // console.log("update course " + JSON.stringify(course));
        
        // Object.assign(course, courseUpdates);
        // return course;
    }

    return { findAllCourses, findCoursesForEnrolledUser, 
        createCourse, deleteCourse,updateCourse,findCourseById };
}

