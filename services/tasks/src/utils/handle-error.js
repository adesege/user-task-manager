import { DatabaseError, ValidationError } from 'sequelize';

const getErrorMessage = (error) => {
  let errorDetails;
  if (error instanceof ValidationError) {
    errorDetails = error.errors;
  } else if (error.isJoi) {
    errorDetails = error.details.map((item) => ({
      message: item.message,
      path: item.path,
    }));
  } else if (error.custom) {
    errorDetails = error.error;
  }
  return errorDetails;
};

export default (res, error) => {
  if (error instanceof DatabaseError) {
    return res.status(500).json({
      error: 'Internal Server Error',
      status: 'failed',
    });
  }

  const errorMessage = getErrorMessage(error);
  const status = error.status || 400;

  return res.status(status).json({
    error: errorMessage,
    status: 'failed',
  });
};
