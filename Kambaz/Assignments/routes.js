import * as dao from "./dao.js";
export default function AssignmentRoutes(app) {

    app.get("/api/assignments", (req, res) => {
        const assignments = dao.findAllAssignments();
        res.send(assignments);
    });

    app.get("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assignment = dao.findAssignmentById(assignmentId);
        if (assignment) {
            res.send(assignment);
        } else {
            res.status(404).send({ error: "Assignment not found" });
        }
    });

    app.get("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignments = dao.findAssignmentsForCourse(courseId);
        res.send(assignments);
    });

    app.post("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
        };
        const newAssignment = dao.createAssignment(assignment);
        res.send(newAssignment);
    });

    app.delete("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const status = await dao.deleteAssignment(assignmentId);
        res.send(status);
    });

    app.put("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const updatedAssignment = dao.updateAssignment(assignmentId, assignmentUpdates);
        if (updatedAssignment) {
            res.send(updatedAssignment);
        } else {
            res.status(404).send({ error: "Assignment not found" });
        }
    });
}
