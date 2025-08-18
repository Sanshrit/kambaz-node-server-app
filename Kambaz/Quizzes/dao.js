import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
import userModel from "../Users/model.js";

export const findAllCourseQuizzes = (cid) => model.find({ course: cid });
export const createQuiz = (quiz) => {
    return model.create({ ...quiz, _id: uuidv4() });
};
export const deleteQuiz = async (quizId) => {
    await userModel.updateMany(
        { "quizAttempts.quiz": quizId },
        { $pull: { quizAttempts: { quiz: quizId } } }
    )
    await model.deleteOne({ _id: quizId })
};
export const updateQuiz = (quizId, quiz) => model.updateOne({ _id: quizId }, { $set: quiz });
export const findOneQuiz = (cid, qid) => model.find({ course: cid, _id: qid });