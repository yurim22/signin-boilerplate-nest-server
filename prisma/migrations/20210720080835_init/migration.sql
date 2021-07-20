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
CREATE TABLE `dummy` (
    `seq` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`seq`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_signin_history` ADD FOREIGN KEY (`id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
