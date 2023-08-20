// import { IGenericErrorResponse } from '../interfaces/common';
// import { IGenericErrorMessage } from '../interfaces/error';

// const handleValidationError = (
//   error: mongoose.Error.ValidationError
// ): IGenericErrorResponse => {
//   const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
//     (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
//       return {
//         path: el?.path,
//         message: el?.message,
//       };
//     }
//   );
//   const statusCode = 400;
//   return {
//     statusCode,
//     message: 'Validation Error',
//     errorMessages: errors,
//   };
// };

// export default handleValidationError;

import { ValidationError } from 'sequelize'; // Import the appropriate validation error type for your Sequelize setup
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleValidationError = (
  error: ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.errors.map(el => {
    return {
      path: el.path as string, // Column or field name that caused the validation error
      message: el.message, // Error message describing the validation failure
    };
  });

  const statusCode = 400; // You can adjust the status code as needed
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;
