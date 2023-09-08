/*
  Warnings:

  - The `marks` column on the `student_enrolled_course_mark` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "student_enrolled_course_mark" DROP COLUMN "marks",
ADD COLUMN     "marks" INTEGER;
