/*
  Warnings:

  - You are about to drop the column `address` on the `product` table. All the data in the column will be lost.
  - Added the required column `area` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teethCount` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `address`,
    ADD COLUMN `area` VARCHAR(191) NOT NULL,
    ADD COLUMN `district` VARCHAR(191) NOT NULL,
    ADD COLUMN `teethCount` VARCHAR(191) NOT NULL;
