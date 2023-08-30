/*
  Warnings:

  - You are about to drop the `CorseToPrerequisiste` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CorseToPrerequisiste" DROP CONSTRAINT "CorseToPrerequisiste_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CorseToPrerequisiste" DROP CONSTRAINT "CorseToPrerequisiste_preRequisiteId_fkey";

-- DropTable
DROP TABLE "CorseToPrerequisiste";

-- CreateTable
CREATE TABLE "corseToPreRequisite" (
    "courseId" TEXT NOT NULL,
    "preRequisiteId" TEXT NOT NULL,

    CONSTRAINT "corseToPreRequisite_pkey" PRIMARY KEY ("courseId","preRequisiteId")
);

-- AddForeignKey
ALTER TABLE "corseToPreRequisite" ADD CONSTRAINT "corseToPreRequisite_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "corseToPreRequisite" ADD CONSTRAINT "corseToPreRequisite_preRequisiteId_fkey" FOREIGN KEY ("preRequisiteId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
