/*
  Warnings:

  - You are about to drop the column `result` on the `study` table. All the data in the column will be lost.
  - The `last_password_update_timestamp` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `study` DROP COLUMN `result`,
    ADD COLUMN     `results` VARCHAR(191);

-- AlterTable
ALTER TABLE `user` DROP COLUMN `last_password_update_timestamp`,
    ADD COLUMN     `last_password_update_timestamp` DATETIME(3);
