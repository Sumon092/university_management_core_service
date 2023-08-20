import { AcademicSemester, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const addSemester = async (
  academicSemesterData: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data: academicSemesterData,
  });
  return result;
};

export const academicSemesterService = {
  addSemester,
};
