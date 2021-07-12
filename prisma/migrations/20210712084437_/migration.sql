/*
  Warnings:

  - You are about to drop the column `image_url` on the `series` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[series_instance_uid]` on the table `series` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[study_instance_uid]` on the table `study` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `series_instance_uid` to the `series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `study_instance_uid` to the `study` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `series` DROP COLUMN `image_url`,
    ADD COLUMN `series_instance_uid` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `study` ADD COLUMN `study_instance_uid` VARCHAR(200) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `series.series_instance_uid_unique` ON `series`(`series_instance_uid`);

-- CreateIndex
CREATE UNIQUE INDEX `study.study_instance_uid_unique` ON `study`(`study_instance_uid`);
