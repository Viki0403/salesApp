import express from "express";
import { prisma } from "../app.js";

const router = express.Router();

router.post("/createUser", createUser);

async function createUser(req, res) {
  try {
    // const data = [
    //   { userId: "1a", name: "Muthu vignesh", email: "muthuvignesh@gmail.com" },
    //   { userId: "2a", name: "kevin", email: "kevin@gmail.com" },
    //   { userId: "3a", name: "sujay", email: "sujay@gmail.com" },
    // ];
    const data = req.body;
    const user = await prisma.user.create({
      data,
    });
    res.status(200).json({
      data,
      message: "User created",
    });
    //console.log("xxx");
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

export { router };
