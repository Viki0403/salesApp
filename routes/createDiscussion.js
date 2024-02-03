import express from "express";
import { prisma } from "../app.js";
const router = express.Router();

router.post("/createDiscussion", crateDiscussion);
router.patch("/updateDiscussion", updateDiscussion);
async function crateDiscussion(req, res) {
  try {
    const data = {
      discussionId: +req.body.discussionId,
      answer: req.body.answer,
      creatorId: +req.body.creatorId,
    };
    await prisma.discussions.create({
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

async function updateDiscussion(req, res) {
  try {
    const id = +req.body.id;
    const data = {
      discussionId: +req.body.discussionId,
      answer: req.body.answer,
      creatorId: +req.body.creatorId,
    };
    await prisma.discussions.update({
      where: {
        id,
      },
      data,
    });
    res.status(200).json({
      message: "Updated Successfully",
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
