import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function QuizAttemptDao() {
    const findAttemptsForQuizAndUser = (quizId, userId) => {
        return model.find({ quizId, userId }).sort({ attemptNumber: -1 });
    };

    const findLastAttemptForQuizAndUser = (quizId, userId) => {
        return model.findOne({ quizId, userId }).sort({ attemptNumber: -1 });
    };

    const countAttemptsForQuizAndUser = (quizId, userId) => {
        return model.countDocuments({ quizId, userId });
    };

    const createAttempt = async (attempt) => {
        //delete attempt._id;
        const newAttempt = {...attempt, _id: uuidv4()};
        return await model.create(newAttempt);
    };

    const findAttemptById = (attemptId) => {
        console.log("attempt id to find " + attemptId);
        
        return model.findById(attemptId);
    };

    const updateAttempt = (attemptId, attempt) => {
        return model.updateOne({ _id: attemptId }, { $set: attempt });
    };

    const deleteAttemptsForQuiz = (quizId) => {
        return model.deleteMany({ quizId });
    };

    return {
        findAttemptsForQuizAndUser,
        findLastAttemptForQuizAndUser,
        countAttemptsForQuizAndUser,
        createAttempt,
        findAttemptById,
        updateAttempt,
        deleteAttemptsForQuiz
    }
}
