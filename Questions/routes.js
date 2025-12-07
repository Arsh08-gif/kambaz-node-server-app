import * as dao from "./dao.js";

export default function QuestionRoutes(app) {
    
    
     const findQuestionsForQuiz = async (req, res) => {
        const { quizId } = req.params;
        console.log("quizId for questions " + quizId);
        
        try {
            const questions = await dao.findQuestionsForQuiz(quizId);
            console.log("questions for quiz " + JSON.stringify(questions));
            
            res.json(questions);
        } catch (error) {
            console.error("Error fetching questions:", error);
            res.status(500).json({ message: "Error fetching questions", error });
        }
    };

    
    const createQuestion = async (req, res) => {
        const { quizId } = req.params;
        const question = {
            ...req.body,
            quizId: quizId,
        };
        try {
            const newQuestion = await dao.createQuestion(question);
            res.json(newQuestion);
        } catch (error) {
            console.error("Error creating question:", error);
            res.status(500).json({ message: "Error creating question", error });
        }
    };

    const getQuestionById = async (req, res) => {
        const { questionId } = req.params;
        try {
            const question = await dao.findQuestionById(questionId);
            if (!question) {
                res.status(404).json({ message: "Question not found" });
                return;
            }
            res.json(question);
        } catch (error) {
            console.error("Error fetching question:", error);
            res.status(500).json({ message: "Error fetching question", error });
        }
    };


    const updateQuestion = async (req, res) => {
        const { questionId } = req.params;
        const questionUpdates = req.body;
        try {
            const status = await dao.updateQuestion(questionId, questionUpdates);
            const updatedQuestion = await dao.findQuestionById(questionId);
            res.json(updatedQuestion);
        } catch (error) {
            console.error("Error updating question:", error);
            res.status(500).json({ message: "Error updating question", error });
        }
    };

   
    const deleteQuestion = async (req, res) => {
        const { questionId } = req.params;
        try {
            const status = await dao.deleteQuestion(questionId);
            res.json(status);
        } catch (error) {
            console.error("Error deleting question:", error);
            res.status(500).json({ message: "Error deleting question", error });
        }
    };

    app.get("/api/quizzes/:quizId/questions",findQuestionsForQuiz)
    app.post("/api/quizzes/:quizId/questions", createQuestion)
    app.get("/api/questions/:questionId", getQuestionById)
    app.put("/api/questions/:questionId", updateQuestion)
    app.delete("/api/questions/:questionId", deleteQuestion)
}