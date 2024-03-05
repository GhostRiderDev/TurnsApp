export const numberToDate = (ms: number): Date => {
  const date = new Date(ms);
  //!const yyMMdd = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;

  return date;
};

export const dateToNumber = (dateToconvert: Date): number => {
  //!const yyMMdd = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;
  return dateToconvert.getTime();
};
