/*
  Warnings:

  - You are about to drop the column `totolCompletedCredits` on the `students_academic_infoes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "students_academic_infoes" DROP COLUMN "totolCompletedCredits",
ADD COLUMN     "totalCompletedCredits" INTEGER DEFAULT 0;
