import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interfaces/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  //Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);
  //the extracted value will be in the first capturing group
  const extractedMessage = match && match[1];
  const errorSources: TErrorSource = [
    {
      path: '',
      message: `${extractedMessage} is already exist`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicate Value Error',
    errorSources,
  };
};

export default handleDuplicateError;
