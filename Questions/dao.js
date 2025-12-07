import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const findQuestionsForQuiz = (quizId) => {
    return model.find({ quizId: quizId }).sort({ order: 1 });
};

export const findQuestionById = (questionId) => {
    return model.findById(questionId);
};

export const createQuestion = async (question) => {
    try {
        //delete question._id; // Remove _id if it exists
        const newQuestion = { ...question, _id: uuidv4() };
        const res = await model.create(newQuestion);
        console.log("created question " + res);
        return res;
    } catch (error) {
        console.error("Error creating question:", error);
        throw error;
    }
};

export const updateQuestion = (questionId, question) => {
    return model.updateOne({ _id: questionId }, { $set: question });
};

export const deleteQuestion = (questionId) => {
    return model.deleteOne({ _id: questionId });
};

export const findAllQuestions = () => {
    return model.find();
};

// Utility function to check if answer is correct (case-insensitive)
export const checkFillInBlankAnswer = (studentAnswer, correctAnswers) => {
    const possibleAnswers = correctAnswers.split(',').map(a => a.trim().toLowerCase());
    const normalizedStudentAnswer = studentAnswer.trim().toLowerCase();
    return possibleAnswers.includes(normalizedStudentAnswer);
};