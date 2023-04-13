type isNumberArgsType = string | number;

export const isNumber = ( value: isNumberArgsType ): boolean => {
  return !isNaN(Number(value));
};
