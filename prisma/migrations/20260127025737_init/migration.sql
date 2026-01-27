-- CreateTable
CREATE TABLE "PrintJob" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "designName" TEXT NOT NULL,
    "sellerName" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "estimatedTime" REAL NOT NULL,
    "actualTime" REAL,
    "filamentUsed" REAL,
    "printer" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "invoiceNumber" TEXT NOT NULL,
    "sellerName" TEXT NOT NULL,
    "filamentCost" REAL NOT NULL,
    "machineCost" REAL NOT NULL,
    "gst" REAL NOT NULL,
    "total" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jobId" TEXT NOT NULL,
    CONSTRAINT "Invoice_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "PrintJob" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_jobId_key" ON "Invoice"("jobId");
