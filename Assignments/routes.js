import AssignemtDao from "./dao.js"

export default function AssignementRoutes(app, db) {
  const dao = AssignemtDao(db);
  const findAssignementForCourse = async (req, res) => {
    const { courseId } = req.params;
    const assignments = await dao.findAssignementForCourse(courseId);
    res.json(assignments);
  }
  const createAssingmentForCourse = async(req, res) => {
    const { courseId } = req.params;
    const assignement = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = await dao.createAssignement(assignement);
    res.send(newAssignment);
  }
  const updateAssignement = async (req, res) => {
    const { assignementId } = req.params;
    const assignementUpdates = req.body;
    const status = await dao.updateAssignement(assignementId, assignementUpdates);
    res.send(status);
  }
  const deleteAssignement = async (req, res) => {
    const { assignementId } = req.params;
    const status = await dao.deleteAssignment(assignementId);
    res.send(status);
  }
  app.delete("/api/assignements/:assignementId", deleteAssignement);
  app.put("/api/assignements/:assignementId", updateAssignement);
  app.post("/api/courses/:courseId/assignements", createAssingmentForCourse);
  app.get("/api/courses/:courseId/assignements", findAssignementForCourse);
}