/*
  Warnings:

  - You are about to drop the `patient_federated` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `series_federated` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `study_federated` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `patient` MODIFY `patient_sex` VARCHAR(191),
    MODIFY `patient_age` VARCHAR(191) DEFAULT '';

-- AlterTable
ALTER TABLE `series` MODIFY `image_url` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `study` MODIFY `analysis_date` DATETIME(3);

-- DropTable
DROP TABLE `patient_federated`;

-- DropTable
DROP TABLE `series_federated`;

-- DropTable
DROP TABLE `study_federated`;

-- CreateTable
CREATE TABLE `dummy` (
    `seq` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`seq`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
