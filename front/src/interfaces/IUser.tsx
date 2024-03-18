type userType = {
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  profile_image: string;
  role: string;
  nDni: string;
  birthdate: string;
};

type credentialType = {
  password: string;
};
export interface IuserToRegister {
  user: userType;
  credential: credentialType;
}
