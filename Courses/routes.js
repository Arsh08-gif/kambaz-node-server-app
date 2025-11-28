console.log("inside course router");

import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";
import { json, response } from "express";
export default function CourseRoutes(app) {
    const dao = CoursesDao();
    const enrollmentsDao = EnrollmentsDao();
    const findAllCourses = async (req, res) => {
        const courses = await dao.findAllCourses();
        res.json(courses);
    }
    const findCoursesForEnrolledUser = async (req, res) => {
        let { userId } = req.params;
        console.log("Route hit! userId:", req.params.userId);
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            console.log("find courses for enrolled user " + currentUser);

            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }
        //const courses = await dao.findCoursesForEnrolledUser(userId);
        const courses = await enrollmentsDao.findCoursesForUser(userId);
        res.json(courses);
    };
    // const enrollUser = async (req, res) => {
    //     let { userId, courseId } = req.params;
    //     const existing = await enrollmentsDao.findEnrollment(userId, courseId);
    //     console.log("existing enrollment " + JSON.stringify(existing));

    //     if (existing) {
    //         return res.status(400).json({ message: "Already enrolled" });
    //     }
    //     const status = await enrollmentsDao.enrollUserInCourse(userId, courseId);
    //     console.log("enrol status " + JSON.stringify(status));
    //     res.json(status)
    // };
    // const unenrollUser = async (req, res) => {
    //     let { userId, courseId } = req.params;
    //     const userEnrollments = await enrollmentsDao.unenrollUserFromCourse(userId, courseId);
    //     console.log("unenrol status " + JSON.stringify(userEnrollments));
    //     res.json(userEnrollments);
    //     //res.sendStatus(200);
    // };

    const enrollUserInCourse = async (req, res) => {
        let { uid, cid } = req.params;
        if (uid === "current") {
            const currentUser = req.session["currentUser"];
            uid = currentUser._id;
        }
        const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
        res.send(status);
    };
    const unenrollUserFromCourse = async (req, res) => {
        let { uid, cid } = req.params;
        if (uid === "current") {
            const currentUser = req.session["currentUser"];
            uid = currentUser._id;
        }
        const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
        res.send(status);
    };

    const getUserEnrollments = async (req, res) => {
        const { userId } = req.params;
        const enrollments = await enrollmentsDao.findEnrollmentsForUser(userId);
        console.log("user enrollements " + JSON.stringify(enrollments));

        res.json(enrollments);
    };
    const createCourse = async (req, res) => {
        const currentUser = req.session["currentUser"];
        const newCourse = await dao.createCourse(req.body);
        console.log("current user in create course " + JSON.stringify(currentUser));
        const newEnrollment = await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
        //res.json(newCourse);
        res.json({
            course: newCourse,
            enrollment: newEnrollment
        });
    };
    const deleteCourse = async (req, res) => {
        const { courseId } = req.params;
        await enrollmentsDao.unenrollAllUsersFromCourse(courseId);
        const status = await dao.deleteCourse(courseId);
        res.send(status);
    }
    const updateCourse = async (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const status = await dao.updateCourse(courseId, courseUpdates);
        res.send(status);
    }
    const findCourseById = async (req, res) => {
        const { ids } = req.body;
        console.log("courses ids : " + ids);

        // const results = db.courses.filter(c => ids.includes(c._id));
        const results = await dao.findCourseById(ids);
        console.log("course id results " + JSON.stringify(results));

        res.json(results);
    }

    const findUsersForCourse = async (req, res) => {
        const { cid } = req.params;
        const users = await enrollmentsDao.findUsersForCourse(cid);
        res.json(users);
    }

    app.get("/api/courses/:cid/users", findUsersForCourse);
    app.get("/api/users/:userId/enrollments", getUserEnrollments);
    // app.delete("/api/courses/:userId/:courseId/enrollments", unenrollUser);
    // app.post("/api/courses/:userId/:courseId/enrollments", enrollUser);
    app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
    app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
    app.put("/api/courses/:courseId", updateCourse);
    app.delete("/api/courses/:courseId", deleteCourse);
    app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
    app.get("/api/courses", findAllCourses);
    app.post("/api/users/current/courses", createCourse);
    app.post("/api/courses/batch", findCourseById)
}

