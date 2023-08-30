import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    code: z.string({
      required_error: 'code is required',
    }),
    credits: z.number({
      required_error: 'credit is required',
    }),
    preRequisiteCourses: z
      .array(
        z.object({
          courseId: z.string(),
        })
      )
      .refine(courses => courses.length > 0, {
        message: 'At least one preRequisiteCourse is required',
      }),
  }),
});

export const CourseValidationSchema = {
  create,
};
