/*
  Warnings:

  - You are about to drop the column `transactionId` on the `Transaction` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "memo" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "description" TEXT,
    "trackingId" TEXT,
    "balance" REAL NOT NULL,
    "transactionDate" DATETIME NOT NULL,
    "checkNumber" INTEGER,
    "categoryId" TEXT,
    "accountId" TEXT NOT NULL,
    "billId" TEXT,
    CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("accountId", "amount", "balance", "billId", "categoryId", "checkNumber", "createdAt", "deleted", "description", "id", "memo", "transactionDate", "updatedAt") SELECT "accountId", "amount", "balance", "billId", "categoryId", "checkNumber", "createdAt", "deleted", "description", "id", "memo", "transactionDate", "updatedAt" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE TABLE "new_Bill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "dueDate" INTEGER NOT NULL,
    "description" TEXT,
    "auto" BOOLEAN NOT NULL DEFAULT false,
    "accountId" TEXT,
    CONSTRAINT "Bill_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Bill" ("accountId", "amount", "auto", "createdAt", "deleted", "description", "dueDate", "id", "name", "updatedAt") SELECT "accountId", "amount", "auto", "createdAt", "deleted", "description", "dueDate", "id", "name", "updatedAt" FROM "Bill";
DROP TABLE "Bill";
ALTER TABLE "new_Bill" RENAME TO "Bill";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
