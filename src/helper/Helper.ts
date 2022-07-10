import ErrorModel from "../model/Error";

export const handleMapError = (input: any): Map<string, string> => {
  const mapError = new Map<string, string>(
    input.map((item: ErrorModel.ErrorValidate) => {
      return [item.field, item.message];
    })
  );
  return mapError;
};
