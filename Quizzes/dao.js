import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function QuizzesDao() {
    const findQuizzesForCourse = async (courseId) => {
        return await model.find({ courseId: courseId });
    };

    const createQuiz = async (quiz) => {
        try {
            console.log("new quiz " + JSON.stringify(quiz));
            const newQuiz = { ...quiz, _id: uuidv4() };
            const res = await model.create(newQuiz)
            console.log("created quiz " + JSON.stringify(res));
            return res;
        }
        catch (error) {
            console.error("create quiz error ", error.message);
        }
    };
    const updateQuiz = async (quizId, quiz) => {
        return await model.updateOne({ _id: quizId }, { $set: quiz });
    };
    const findQuizById = async (quizId) => {
        console.log("quiz id to find " + quizId);
        
        return await model.findById(quizId);
    };


    const deleteQuiz = async (quizId) => {
        return await model.deleteOne({ _id: quizId });
    };


    return {
        findQuizzesForCourse,
        updateQuiz,
        deleteQuiz,
        createQuiz,
        findQuizById
    }
}