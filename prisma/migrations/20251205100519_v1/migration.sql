/*
  Warnings:

  - You are about to drop the column `category` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `fueltype` on the `cars` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fueltypeId` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `brands` MODIFY `logoUrl` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `cars` DROP COLUMN `category`,
    DROP COLUMN `fueltype`,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `fueltypeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `isActive` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Fueltype` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `cars_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `cars_fueltypeId_fkey` FOREIGN KEY (`fueltypeId`) REFERENCES `Fueltype`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
