/*
  Warnings:

  - The primary key for the `student_semester_registration_course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `maxCapacity` on the `offered_course_sections` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "academic-semesters" ADD COLUMN     "isCurrent" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "offered_course_sections" DROP COLUMN "maxCapacity",
ADD COLUMN     "maxCapacity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "student_semester_registration_course" DROP CONSTRAINT "student_semester_registration_course_pkey",
ADD CONSTRAINT "student_semester_registration_course_pkey" PRIMARY KEY ("semesterRegistrationId", "studentId", "offeredCourseId");
