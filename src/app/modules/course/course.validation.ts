import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    code: z.string({
      required_error: 'code is required',
    }),
    credits: z.string({
      required_error: 'credit is required',
    }),
    preRequisite: z.string({
      required_error: 'prerequisite is required',
    }),
    preRequisiteFor: z.string({
      required_error: 'prerequisiteFor is required',
    }),
  }),
});

const CourseValidationSchema = {
  create,
};
