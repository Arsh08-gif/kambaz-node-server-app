import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao() {
    //const { enrollments } = db;

    async function findCoursesForUser(userId) {
        const enrollments = await model.find({ user: userId }).populate("course");
        console.log("enrollments " + JSON.stringify(enrollments));
        const mappedEnrollements = enrollments.map((enrollment) => enrollment.course);
        console.log("mapped enrollments " + mappedEnrollements);
        return mappedEnrollements;
        //return enrollments.map((enrollment) => enrollment.course);
    }
    async function findUsersForCourse(courseId) {
        const enrollments = await model.find({ course: courseId }).populate("user");
        console.log("user enrollments " + enrollments);
        const enrolledUsers = enrollments.map((enrollment) => enrollment.user);
        console.log("enrolled users " + enrolledUsers);
        return enrolledUsers;
    }

    function enrollUserInCourse(userId, courseId) {
        return model.create({
            user: userId,
            course: courseId,
            _id: `${userId}-${courseId}`,
        });

        // const enrollment = {
        //     _id: uuidv4(),
        //     user: userId,
        //     course: courseId
        // };
        // db.enrollments.push(enrollment);
        // console.log("enrollment array after push " + JSON.stringify(db.enrollments));

        // return enrollment;
        //enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
    }
    function unenrollUserFromCourse(user, course) {
        // return enrollments.filter(
        //     (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
        // );
        // db.enrollments = db.enrollments.filter(
        //     (e) => !(e.user === userId && e.course === courseId)
        // );
        // console.log("enrollment array after removal " + JSON.stringify(db.enrollments));
        // return db.enrollments;
        return model.deleteOne({ user, course });
    }
    async function findEnrollmentsForUser(userId) {
        const res = await model.find({ user: userId })
        console.log("enrollements for user " + JSON.stringify(res));
        // return db.enrollments.filter((e) => e.user === userId);
        return res;
    };
    function findEnrollment(userId, courseId) {
        return db.enrollments.find((e) => e.user === userId && e.course === courseId);
    }
    function unenrollAllUsersFromCourse(courseId) {
        return model.deleteMany({ course: courseId });
    }


    return {
        findCoursesForUser,
        findUsersForCourse,
        enrollUserInCourse,
        unenrollUserFromCourse,
        enrollUserInCourse,
        unenrollUserFromCourse,
        findEnrollmentsForUser,
        findEnrollment,
        unenrollAllUsersFromCourse
    };
}

