import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {
    const { enrollments } = db;
    function enrollUserInCourse(userId, courseId) {
        const enrollment = {
            _id: uuidv4(),
            user: userId,
            course: courseId
        };
        db.enrollments.push(enrollment);
        console.log("enrollment array after push " + JSON.stringify(db.enrollments));
        
        return enrollment;
        //enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
    }
    function unenrollUserFromCourse(userId, courseId) {
        // return enrollments.filter(
        //     (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
        // );
        db.enrollments = db.enrollments.filter(
            (e) => !(e.user === userId && e.course === courseId)
        );
        console.log("enrollment array after removal " + JSON.stringify(db.enrollments));
        return db.enrollments;
    }
    function findEnrollmentsForUser(userId) {
        console.log("enrollment array during find " + JSON.stringify(db.enrollments));
        return db.enrollments.filter((e) => e.user === userId);
    };
    function findEnrollment(userId, courseId) {
        return db.enrollments.find((e) => e.user === userId && e.course === courseId);
    }

    return { enrollUserInCourse, unenrollUserFromCourse, findEnrollmentsForUser, findEnrollment };
}

