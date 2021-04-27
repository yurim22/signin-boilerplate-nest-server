/*
  Warnings:

  - A unique constraint covering the columns `[patient_id]` on the table `patient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `patient.patient_id_unique` ON `patient`(`patient_id`);
