import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app){
    const dao = QuizzesDao();
    const getQuizzesForCourse = async (req, res) => {
        const { courseId } = req.params;
        try {
            const quizzes = await dao.findQuizzesForCourse(courseId);
            console.log("quizzes for course " + quizzes);
            
            res.json(quizzes);
        } catch (error) {
            res.status(500).json({ message: "Error fetching quizzes", error });
        }
    };

    const getQuiz = async (req, res) => {
        const { quizId } = req.params;
        try {
            const quiz = await dao.findQuizById(quizId);
            if (!quiz) {
                res.status(404).json({ message: "Quiz not found" });
                return;
            }
            res.json(quiz);
        } catch (error) {
            res.status(500).json({ message: "Error fetching quiz", error });
        }
    }

    const updateQuiz = async(req,res) =>{
        const { quizId } = req.params;
        const quizUpdates = req.body;
        try {
            const status = await dao.updateQuiz(quizId, quizUpdates);
            console.log("update status " + JSON.stringify(status));
            
            const updatedQuiz = await dao.findQuizById(quizId);
            console.log("updated quiz " + JSON.stringify(updateQuiz))
            res.json(updatedQuiz);
        } catch (error) {
            res.status(500).json({ message: "Error updating quiz", error });
        }
    }

    const createQuiz = async (req, res) => {
        const { courseId } = req.params;
        const quiz = {
            ...req.body,
            courseId: courseId,
        };
        try {
            const newQuiz = await dao.createQuiz(quiz);
            res.json(newQuiz);
        } catch (error) {
            res.status(500).json({ message: "Error creating quiz", error });
        }
    };

    const deleteQuiz = async (req, res) => {
        const { quizId } = req.params;
        try {
            const status = await dao.deleteQuiz(quizId);
            res.json(status);
        } catch (error) {
            res.status(500).json({ message: "Error deleting quiz", error });
        }
    };



    app.get("/api/courses/:courseId/quizzes",getQuizzesForCourse)
    app.put("/api/quizzes/:quizId",updateQuiz)
    app.post("/api/courses/:courseId/quizzes",createQuiz)
    app.delete("/api/quizzes/:quizId",deleteQuiz)
    app.get("/api/quizzes/:quizId",getQuiz)
}