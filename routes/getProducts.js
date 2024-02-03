import express from "express";
import { prisma } from "../app.js";
const router = express.Router();

router.get("/products", fetchProducts);
const take = 5;
async function fetchProducts(req, res) {
  try {
    const page = req.query.page;
    const products = await prisma.product.findMany({
      skip: page * take,
      take: +req.body.take,
    });
    //console.log(req.body);
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

export { router };
