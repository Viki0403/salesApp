import express from "express";
import { prisma } from "../app.js";
const router = express.Router();

router.post("/buy", buy);

async function buy(req, res) {
  try {
    const id = req.body.productId;
    const product = await prisma.product.findUnique({
      where: {
        id: +id,
      },
    });
    console.log(product);
    const productName = product.type + "/" + product.breed;
    const price = product.price;
    const buyerId = product.creatorId;
    const data = {
      productName,
      price,
      buyerId,
    };
    await prisma.boughtProducts.create({
      data,
    });
    await prisma.product.delete({
      where: {
        id: +id,
      },
    });
    res.status(200).json({
      product: data,
      message: "Product is successfully bought",
    });
  } catch (err) {
    console.log(err);
  }
}

export { router };
