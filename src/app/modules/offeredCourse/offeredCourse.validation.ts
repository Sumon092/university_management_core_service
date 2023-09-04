import { z } from 'zod';

const create = z.object({
  body: z.object({
    academicDepartmentId: z.string({
      required_error: 'Academic department id is required',
    }),
    semesterRegistrationId: z.string({
      required_error: 'Semester registrations id is required',
    }),
    courseIds: z.array(
      z.string({
        required_error: 'Course id is required',
      }),
      {
        required_error: 'Course Ids required',
      }
    ),
  }),
});

export const OfferedCourseValidationSchema = {
  create,
};
