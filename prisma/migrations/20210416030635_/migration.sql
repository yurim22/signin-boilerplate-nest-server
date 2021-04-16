/*
  Warnings:

  - The values [] on the enum `user_permission` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `permission` ENUM('ADMINISTRATOR', 'PHYSICIAN', 'DEVELOPER') NOT NULL DEFAULT 'PHYSICIAN';
