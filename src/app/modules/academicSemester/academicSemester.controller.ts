import { Request, Response } from 'express';
import { academicSemesterService } from './academicSemester.services';

const addSemester = async (req: Request, res: Response) => {
  try {
    const result = await academicSemesterService.addSemester(req.body);
    res.json({
      status: 200,
      success: true,
      message: 'Semester added successfully',
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const semesterController = {
  addSemester,
};
