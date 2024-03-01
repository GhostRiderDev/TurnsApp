const info = (...information: string[]): void => {
  console.info("--[INFO]\t", ...information);
};

const warn = (...advertise: string[]): void => {
  console.warn("--[WARNING]\t", ...advertise);
};

const err = (...error: string[]): void => {
  console.error("--[ERROR]\t", ...error);
};
export default { info, warn, err };

// {
//   "user": {
//       "username": "maria@gmail",
//       "first_name": "maria",
//       "last_name": "Ledesma",
//       "role": "Admin",
//       "contact": {
//           "phone": "43343534"
//       },
//       "profile_image": "https://maria.png"
//   },
//   "credential": {
//       "password": "root"
//   }
// }
