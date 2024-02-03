import express from "express";
import { prisma } from "../app.js";

const router = express.Router();

router.post("/sell", sellProduct);

async function sellProduct(req, res) {
  try {
    const id = req.body.productId;
    console.log(id);
    const product = await prisma.product.findUnique({
      where: {
        id: +id,
      },
    });
    const productName = product.type + "/" + product.breed;
    const price = product.price;
    const sellerId = product.creatorId;
    const data = {
      productName,
      price,
      sellerId,
    };
    // await prisma.soldProducts.create({
    //   data,
    // });
    await prisma.product.delete({
      where: {
        id: +id,
      },
    });
    res.status(200).json({
      product: data,
      message: "Your Product is successfully sold",
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
