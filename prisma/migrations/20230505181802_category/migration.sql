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
    CONSTRAINT "Transaction_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("accountId", "amount", "balance", "billId", "categoryId", "checkNumber", "createdAt", "deleted", "description", "id", "memo", "trackingId", "transactionDate", "updatedAt") SELECT "accountId", "amount", "balance", "billId", "categoryId", "checkNumber", "createdAt", "deleted", "description", "id", "memo", "trackingId", "transactionDate", "updatedAt" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
