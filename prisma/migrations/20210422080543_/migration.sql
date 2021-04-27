/*
  Warnings:

  - The `sign_in_timestamp` column on the `user_signin_history` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sign_out_timestamp` column on the `user_signin_history` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `user_signin_history` DROP COLUMN `sign_in_timestamp`,
    ADD COLUMN     `sign_in_timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    DROP COLUMN `sign_out_timestamp`,
    ADD COLUMN     `sign_out_timestamp` DATETIME(3);
