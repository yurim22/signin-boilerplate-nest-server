/*
  Warnings:

  - You are about to drop the `_studyuserconfirm` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_studyuserconfirm` DROP FOREIGN KEY `_studyuserconfirm_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_studyuserconfirm` DROP FOREIGN KEY `_studyuserconfirm_ibfk_2`;

-- AlterTable
ALTER TABLE `study` ADD COLUMN `confirmed_by` VARCHAR(191);

-- DropTable
DROP TABLE `_studyuserconfirm`;
