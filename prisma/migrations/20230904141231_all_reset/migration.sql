-- CreateEnum
CREATE TYPE "WeedDays" AS ENUM ('SATURDAY', 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY');

-- CreateTable
CREATE TABLE "offered_course_class_schedule" (
    "id" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "dayOfWeek" "WeedDays" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "offeredCourseSectionId" TEXT NOT NULL,
    "semesterRegistrationId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,

    CONSTRAINT "offered_course_class_schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offered_course_class_schedule" ADD CONSTRAINT "offered_course_class_schedule_offeredCourseSectionId_fkey" FOREIGN KEY ("offeredCourseSectionId") REFERENCES "offered_course_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_course_class_schedule" ADD CONSTRAINT "offered_course_class_schedule_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester_registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_course_class_schedule" ADD CONSTRAINT "offered_course_class_schedule_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_course_class_schedule" ADD CONSTRAINT "offered_course_class_schedule_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
