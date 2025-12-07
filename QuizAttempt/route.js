import QuizAttemptDao from "./dao.js";
import {findQuestionsForQuiz} from "../Questions/dao.js"

export default function QuizAttemptRoutes(app){
    const dao = QuizAttemptDao();
    //const questionDao = findQuestionsForQuiz();
    const getAttemptInfo =  async (req, res) => {
        const { quizId, userId } = req.params;
        try {
            const lastAttempt = await dao.findLastAttemptForQuizAndUser(quizId, userId);
            const totalAttempts = await dao.countAttemptsForQuizAndUser(quizId, userId);
            
            res.json({
                lastAttempt,
                totalAttempts
            });
        } catch (error) {
            console.error("Error fetching attempts:", error);
            res.status(500).json({ message: "Error fetching attempts", error });
        }
    };


    const submitAttempt =  async (req, res) => {
        const { quizId } = req.params;
        const { userId, answers, courseId } = req.body;
        
        try {
            // Get total attempts
            const totalAttempts = await dao.countAttemptsForQuizAndUser(quizId, userId);
            console.log("total attempts " + totalAttempts);
            
            
            // Get all questions for the quiz
            const questions = await findQuestionsForQuiz(quizId);
            
            // Grade each answer
            let totalScore = 0;
            const gradedAnswers = answers.map((answer) => {
                const question = questions.find(q => q._id.toString() === answer.questionId);
                if (!question) return { ...answer, isCorrect: false, pointsEarned: 0 };
                
                let isCorrect = false;
                
                if (question.type === "Multiple Choice") {
                    const correctChoice = question.choices.find((c) => c.correct);
                    isCorrect = correctChoice?.text === answer.answer;
                } else if (question.type === "True/False") {
                    isCorrect = question.correctAnswer === answer.answer;
                } else if (question.type === "Fill in the Blank") {
                    const possibleAnswers = question.correctAnswer
                        .split(',')
                        .map((a) => a.trim().toLowerCase());
                    isCorrect = possibleAnswers.includes(answer.answer?.toLowerCase().trim());
                }
                
                const pointsEarned = isCorrect ? question.points : 0;
                totalScore += pointsEarned;
                
                return {
                    questionId: answer.questionId,
                    answer: answer.answer,
                    isCorrect,
                    pointsEarned
                };
            });
            
            // Create new attempt
            const newAttempt = await dao.createAttempt({
                quizId,
                userId,
                courseId,
                attemptNumber: totalAttempts + 1,
                score: totalScore,
                answers: gradedAnswers,
                startedAt: req.body.startedAt || new Date(),
                submittedAt: new Date(),
                timeSpent: req.body.timeSpent || 0,
                status: "submitted"
            });
            
            res.json(newAttempt);
        } catch (error) {
            console.error("Error creating attempt:", error);
            res.status(500).json({ message: "Error creating attempt", error });
        }
    };

    
    const getAttemptById = async (req, res) => {
        const { attemptId } = req.params;
        try {
            const attempt = await dao.findAttemptById(attemptId);
            console.log("attempt by id " + JSON.stringify(attempt));
            
            if (!attempt) {
                res.status(404).json({ message: "Attempt not found" });
                return;
            }
            res.json(attempt);
        } catch (error) {
            console.error("Error fetching attempt:", error);
            res.status(500).json({ message: "Error fetching attempt", error });
        }
    };

    
    const getUserAttempt = async (req, res) => {
        const { quizId, userId } = req.params;
        try {
            const attempts = await dao.findAttemptsForQuizAndUser(quizId, userId);
            res.json(attempts);
        } catch (error) {
            console.error("Error fetching attempts:", error);
            res.status(500).json({ message: "Error fetching attempts", error });
        }
    };


    app.get("/api/quizzes/:quizId/attempts/user/:userId",getAttemptInfo)
    app.post("/api/quizzes/:quizId/attempts",submitAttempt)
    app.get("/api/attempts/:attemptId", getAttemptById)
    app.get("/api/quizzes/:quizId/users/:userId/attempts", getUserAttempt)

}