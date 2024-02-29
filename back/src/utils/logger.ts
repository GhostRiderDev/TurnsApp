const info = (information: string): void => {
  console.info(information);
};

const warn = (advertise: string): void => {
  console.info(advertise);
};

const err = (error: string): void => {
  console.info(error);
};
export default { info, warn, err };
