/*
  Warnings:

  - Added the required column `floor` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shelf` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `book` ADD COLUMN `floor` VARCHAR(191) NOT NULL,
    ADD COLUMN `section` VARCHAR(191) NOT NULL,
    ADD COLUMN `shelf` VARCHAR(191) NOT NULL;
