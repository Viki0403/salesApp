import express from "express";
import { prisma } from "../app.js";
const router = express.Router();

router.get("/getQuestions", fetchQuestions);
router.delete("/deleteQuestion", deleteQuestion);
async function fetchQuestions(req, res) {
  try {
    const data = await prisma.questions.findMany();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function deleteQuestion(req, res) {
  try {
    const id = +req.body.id;
    await prisma.questions.delete({
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
