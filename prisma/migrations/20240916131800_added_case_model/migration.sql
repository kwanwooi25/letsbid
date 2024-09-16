-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL,
    "caseYear" INTEGER NOT NULL,
    "caseNumber" INTEGER NOT NULL,
    "groupId" TEXT NOT NULL,
    "bidStartsAt" TIMESTAMP(3) NOT NULL,
    "bidEndsAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
