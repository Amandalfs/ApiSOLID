-- CreateTable
CREATE TABLE "classifications" (
    "id" TEXT NOT NULL,
    "class" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gynId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "classifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "classifications" ADD CONSTRAINT "classifications_gynId_fkey" FOREIGN KEY ("gynId") REFERENCES "gyns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classifications" ADD CONSTRAINT "classifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
