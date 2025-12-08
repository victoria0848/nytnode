/*
  Warnings:

  - You are about to drop the column `brand` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - Added the required column `logoUrl` to the `brands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandId` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `brands` ADD COLUMN `logoUrl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cars` DROP COLUMN `brand`,
    ADD COLUMN `brandId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `name`,
    ADD COLUMN `firstname` VARCHAR(191) NOT NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL,
    ADD COLUMN `lastname` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` ENUM('USER', 'ADMIN') NOT NULL;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `cars_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `brands`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
