import { v4 as uuidv4 } from 'uuid';
import model from "./model.js";

export default function AssignemtDao() {
    async function findAssignementForCourse(courseId) {
        // const { assignments } = db;
        // return assignments.filter((assignement) => assignement.course === courseId);
        const assignment = await model.find({ course: courseId });
        console.log("found asssingment dao " + assignment);  
        return assignment;
    }
    async function createAssignement(assignement) {
        const newAssignment = { ...assignement, _id: uuidv4() };
        //db.assignments = [...db.assignments, newAssignment];
        const status = await model.create(assignement)
        console.log("create assingment " + status);
        return newAssignment;
    }
    async function updateAssignement(assignementId, assignementUpdates) {
        //const { assignments } = db;
        // const assignement = assignments.find((assignement) => assignement._id === assignementId);
        // const assignement = model.findById(assignementId);
        // Object.assign(assignement, assignementUpdates);
        const status = await model.updateOne({ _id: assignementId }, { $set: assignementUpdates });
        console.log("update assignment status " + status);  
        return status;
        //return assignement;
    }
    async function deleteAssignment(assignementId) {
        // const { assignments } = db;
        // db.assignments = assignments.filter((assignement) => assignement._id !== assignementId);
        return await model.deleteOne({_id : assignementId})
    }

    return {
        findAssignementForCourse,
        createAssignement,
        updateAssignement,
        deleteAssignment
    };
}