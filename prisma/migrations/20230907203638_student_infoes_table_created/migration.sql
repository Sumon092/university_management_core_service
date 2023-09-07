-- CreateTable
CREATE TABLE "students_academic_infoes" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,
    "totolCompletedCredits" INTEGER DEFAULT 0,
    "cgpa" DOUBLE PRECISION DEFAULT 0,

    CONSTRAINT "students_academic_infoes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "students_academic_infoes" ADD CONSTRAINT "students_academic_infoes_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
