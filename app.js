import express from "express";
import { PrismaClient } from "@prisma/client";
import { router as createUser } from "./routes/createsuser.js";
import { router as createProduct } from "./routes/createProduct.js";
import { router as getProducts } from "./routes/getProducts.js";
import { router as sellProduct } from "./routes/sellProduct.js";
import { router as buyProduct } from "./routes/buyProduct.js";
import { router as createQuestion } from "./routes/createQuestion.js";
import { router as getDiscussions } from "./routes/getDiscussions.js";
import { router as getQuestions } from "./routes/getQuestions.js";
import { router as createDiscussion } from "./routes/createDiscussion.js";
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use("/", createUser);
app.use("/", createProduct);
app.use("/", getProducts);
app.use("/", sellProduct);
app.use("/", buyProduct);
app.use("/", createQuestion);
app.use("/", getDiscussions);
app.use("/", getQuestions);
app.use("/", createDiscussion);

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { prisma };
