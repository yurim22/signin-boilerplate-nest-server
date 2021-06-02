/*
  Warnings:

  - You are about to drop the column `confirmed_user_id` on the `study` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `receive_pacs` MODIFY `port` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `send_pacs` MODIFY `port` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `study` DROP COLUMN `confirmed_user_id`,
    ADD COLUMN `confirm_user_id` VARCHAR(191);
