-- CreateTable
CREATE TABLE `User` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `PasswordHash` VARCHAR(255) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`Id`),
    UNIQUE INDEX `User_Email_key`(`Email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100) NOT NULL,
    `Type` ENUM('INCOME', 'EXPENSE') NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`Id`),
    UNIQUE INDEX `Category_Name_Type_key`(`Name`, `Type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `UserId` INTEGER NOT NULL,
    `CategoryId` INTEGER NOT NULL,
    `Type` ENUM('INCOME', 'EXPENSE') NOT NULL,
    `Amount` DECIMAL(15, 2) NOT NULL,
    `Description` VARCHAR(255) NOT NULL,
    `TransactionDate` DATE NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`Id`),
    INDEX `Transaction_UserId_TransactionDate_idx`(`UserId`, `TransactionDate`),
    INDEX `Transaction_UserId_Type_idx`(`UserId`, `Type`),
    CONSTRAINT `Transaction_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `Transaction_CategoryId_fkey` FOREIGN KEY (`CategoryId`) REFERENCES `Category`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
