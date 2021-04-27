/*
  Warnings:

  - A unique constraint covering the columns `[seq,id]` on the table `user_signin_history` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_signin_history.seq_id_unique` ON `user_signin_history`(`seq`, `id`);
