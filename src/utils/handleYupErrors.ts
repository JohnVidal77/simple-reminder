import { ValidationError } from 'yup';
import { Errors } from '../types/Errors';

export function handleYupErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach((error: ValidationError) => {
    if (error.path) validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
