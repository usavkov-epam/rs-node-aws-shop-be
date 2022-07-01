import { ValidationErrorCodes } from "./constants";

interface QueryParams {
  [param: string]: string,
}

const ERRORS = {
  [ValidationErrorCodes.nameParamAbsent]: `Query must contain "name" parameter.`,
  [ValidationErrorCodes.invalidExtension]: `Invalid extension of file. Allowed only "csv".`,
}

export const validateQueryParams = (params: QueryParams) => {
  if (!params?.name) {
    return {
      message: ERRORS[ValidationErrorCodes.nameParamAbsent],
      code: ValidationErrorCodes.nameParamAbsent,
    };
  }

  if (!(/^.*(\.csv)$/).test(params.name)) {
    return {
      message: ERRORS[ValidationErrorCodes.invalidExtension],
      code: ValidationErrorCodes.invalidExtension,
    };
  }
};

export const validateImport = async ({
  queryStringParameters,
}) => {
  const errors = [
    validateQueryParams(queryStringParameters),
  ].filter(Boolean);

  if (errors.length) return { errors };
};
