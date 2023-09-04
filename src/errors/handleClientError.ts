import { Prisma } from '@prisma/client';
import { IGenericErrorMessage } from '../interfaces/error';

const handleClientError = (error: Prisma.PrismaClientKnownRequestError) => {
  let errors: IGenericErrorMessage[] = [];
  let message = '';
  const statusCode = 400;
  if (error.code === 'P2025') {
    message = (error.meta?.cause as string) || 'Record not found';
    errors = [
      {
        path: '',
        message,
      },
    ];
  } else if (error.code === 'P2003') {
    if (error.message.includes('delete()` invocation:')) {
      ('Delete Failed');
      errors = [
        {
          path: '',
          message,
        },
      ];
    }
  }

  return {
    statusCode,
    message: 'Client Error',
    errorMessages: errors,
  };
};

export default handleClientError;
