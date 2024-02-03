import express from "express";
import { prisma } from "../app.js";
const router = express.Router();

router.post("/createQuestion", createQuestion);
router.patch("/updateQuestion", updateQuestion);
async function createQuestion(req, res) {
  try {
    const data = {
      question: req.body.question,
      creatorId: +req.body.creatorId,
    };
    await prisma.questions.create({
      data,
    });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function updateQuestion(req, res) {
  try {
    const data = {
      question: req.body.question,
      creatorId: +req.body.creatorId,
    };
    await prisma.questions.update({
      where: {
        id: +req.body.id,
      },
      data,
    });
    res.status(200).json({
      message: "Question updated Successfully",
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
