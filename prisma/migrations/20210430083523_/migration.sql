-- DropIndex
DROP INDEX `user_signin_history.seq_id_unique` ON `user_signin_history`;

-- CreateTable
CREATE TABLE `patient_federated` (
    `seq` INTEGER NOT NULL AUTO_INCREMENT,
    `creation_timestamp` DATETIME(3),
    `patient_name` VARCHAR(191),
    `patient_id` VARCHAR(191) NOT NULL,
    `patient_sex` VARCHAR(191),
    `patient_age` VARCHAR(191),

    PRIMARY KEY (`seq`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `series_federated` (
    `seq` INTEGER NOT NULL AUTO_INCREMENT,
    `image_url` VARCHAR(191),
    `study_seq` INTEGER NOT NULL,

    PRIMARY KEY (`seq`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `study_federated` (
    `seq` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('RECEIVED', 'ANALYZED', 'REVIEWED') NOT NULL,
    `patient_id` VARCHAR(191) NOT NULL,
    `study_date` DATETIME(3) NOT NULL,
    `analysis_date` DATETIME(3) NOT NULL,
    `result` VARCHAR(191) NOT NULL,
    `volumes` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`seq`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
