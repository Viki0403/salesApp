import express from "express";
import { prisma } from "../app.js";

const router = express.Router();

router.post("/createProduct", createProduct);
router.patch("/updateProduct", updateProduct);

async function createProduct(req, res) {
  try {
    let data;
    if (req.body.productionPerDay) data = req.body;
    else {
      data = {
        type: req.body.type,
        breed: req.body.breed,
        description: req.body.description,
        weight: req.body.weight,
        imgURL: req.body.imgURL,
        price: +req.body.price,
        isInfected: Boolean(req.body.isInfected),
        infectedReason: req.body.infectedReason,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        pincode: +req.body.pincode,
        creatorId: +req.body.creatorId,
      };
    }

    await prisma.product.create({
      data,
    });
    res.status(200).json({
      data,
      message: "Product Created",
    });
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function updateProduct(req, res) {
  try {
    let data;
    // if (req.body.productionPerDay) data = req.body;

    data = {
      id: Number(req.body.id),
      type: req.body.type,
      breed: req.body.breed,
      description: req.body.description,
      weight: req.body.weight,
      imgURL: req.body.imgURL,
      price: +req.body.price,
      isInfected: Boolean(req.body.isInfected),
      infectedReason: req.body.infectedReason,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      pincode: +req.body.pincode,
      creatorId: +req.body.creatorId,
    };
    await prisma.product.update({
      where: {
        id: +req.body.id,
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
