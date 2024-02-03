import express from "express";
import { prisma } from "../app.js";
const router = express.Router();

router.get("/getDiscussions", fetchDiscussions);
router.delete("/deleteDiscussion", deleteDiscussion);

async function fetchDiscussions(req, res) {
  try {
    const dataQuestion = await prisma.questions.findUnique({
      where: {
        id: +req.body.discussionId,
      },
    });
    const dataAnswers = await prisma.discussions.findMany({
      where: {
        discussionId: +req.body.discussionId,
      },
    });
    res.status(200).json({
      dataQuestion,
      dataAnswers,
    });
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function deleteDiscussion(req, res) {
  try {
    const id = +req.body.id;
    await prisma.discussions.delete({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: "Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}
export { router };
