import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const findAllCourseQuizzes = (cid) => model.find({ course: cid });
export const createQuiz = (quiz) => {
    return model.create({ ...quiz, _id: uuidv4() });
};
export const deleteQuiz = (quizId) => model.deleteOne({ _id: quizId });
export const updateQuiz = (quizId, quiz) => model.updateOne({ _id: quizId }, { $set: quiz });
export const findOneQuiz = (cid, qid) => model.find({ course: cid, _id: qid });