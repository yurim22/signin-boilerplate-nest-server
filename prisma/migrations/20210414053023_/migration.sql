-- CreateTable
CREATE TABLE `receive_pacs` (
    `creation_timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_timestamp` DATETIME(3),
    `receive_pacs_index` INTEGER NOT NULL AUTO_INCREMENT,
    `AE` VARCHAR(191) NOT NULL,
    `host_ip` VARCHAR(191) NOT NULL,
    `port` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `receive_pacs.user_id_unique`(`user_id`),
    PRIMARY KEY (`receive_pacs_index`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `send_pacs` (
    `creation_timeStamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_timestamp` DATETIME(3),
    `send_pacs_index` INTEGER NOT NULL AUTO_INCREMENT,
    `AE` VARCHAR(191) NOT NULL,
    `client_ip` VARCHAR(191) NOT NULL,
    `port` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `send_pacs.user_id_unique`(`user_id`),
    PRIMARY KEY (`send_pacs_index`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `seq` INTEGER NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `permission` ENUM('ADMINISTRATOR', 'PHYSICIAN', 'DEVELOPER') NOT NULL DEFAULT 'PHYSICIAN',
    `institution` VARCHAR(191),
    `creation_timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_timestamp` DATETIME(3),
    `invalid_password_count` INTEGER DEFAULT 0,
    `last_password_update_timestamp` DATETIME(3),

    UNIQUE INDEX `user.id_unique`(`id`),
    PRIMARY KEY (`seq`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_signin_history` (
    `id` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(191),
    `seq` INTEGER NOT NULL AUTO_INCREMENT,
    `sign_in_timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sign_out_timestamp` DATETIME(3),

    INDEX `id`(`id`),
    PRIMARY KEY (`seq`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient` (
    `seq` INTEGER NOT NULL AUTO_INCREMENT,
    `creation_timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `patient_id` VARCHAR(191) NOT NULL,
    `patient_name` VARCHAR(191),
    `patient_sex` VARCHAR(191),
    `patient_age` VARCHAR(191) DEFAULT '',

    UNIQUE INDEX `patient.patient_id_unique`(`patient_id`),
    INDEX `patient_id`(`patient_id`),
    PRIMARY KEY (`seq`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `series` (
    `seq` INTEGER NOT NULL AUTO_INCREMENT,
    `series_instance_uid` VARCHAR(200) NOT NULL,
    `study_seq` INTEGER NOT NULL,

    UNIQUE INDEX `series.series_instance_uid_unique`(`series_instance_uid`),
    UNIQUE INDEX `series.study_seq_unique`(`study_seq`),
    PRIMARY KEY (`seq`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `study` (
    `seq` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('RECEIVED', 'ANALYZED', 'REVIEWED') NOT NULL DEFAULT 'ANALYZED',
    `patient_id` VARCHAR(191) NOT NULL,
    `study_date` DATETIME(3) NOT NULL,
    `analysis_date` DATETIME(3),
    `volumes` VARCHAR(191) NOT NULL,
    `results` VARCHAR(191),
    `confirmed_by` VARCHAR(191),
    `confirm_user_id` VARCHAR(191),
    `confirmed_date` DATETIME(3),
    `study_instance_uid` VARCHAR(200) NOT NULL,

    UNIQUE INDEX `study.study_instance_uid_unique`(`study_instance_uid`),
    INDEX `patient_id`(`patient_id`),
    PRIMARY KEY (`seq`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dummy` (
    `seq` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`seq`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `receive_pacs` ADD FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `send_pacs` ADD FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_signin_history` ADD FOREIGN KEY (`id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `series` ADD FOREIGN KEY (`study_seq`) REFERENCES `study`(`seq`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `study` ADD FOREIGN KEY (`patient_id`) REFERENCES `patient`(`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;
