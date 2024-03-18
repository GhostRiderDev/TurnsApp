import validator from "validator";
import Joi from "joi";

import ValidationErrror from "../Error/ValidationError";
import logger from "../utils/logger";

export const validateUUID = (id: string): void => {
  if (!validator.isUUID(id)) {
    throw new ValidationErrror("Id must be a UUID");
  }
};

const userSchema = Joi.object({
  id_user: Joi.string().uuid().optional(),
  username: Joi.string().email().required(),
  first_name: Joi.string().alphanum().min(3).max(50).required(),
  last_name: Joi.string().alphanum().min(3).max(50).required(),
  role: Joi.string().valid("Client", "Admin", "Owner").required(),
  id_credential: Joi.string().uuid().optional(),
  nDni: Joi.string()
    .min(6)
    .max(15)
    .pattern(/^[0-9]+$/)
    .optional(),
  phone: Joi.string()
    .min(10)
    .max(15)
    .pattern(/^[0-9]+$/)
    .optional(),
  profile_image: Joi.string()
    .uri({
      scheme: ["http", "https"],
    })
    .regex(/\.(jpg|jpeg|png|gif)$/)
    .optional(),
  birthdate: Joi.date()
    .max("now")
    .timestamp("javascript") // La fecha de nacimiento no puede ser en el futuro
    .min(new Date(new Date().setFullYear(new Date().getFullYear() - 100))) // Establece un rango de 100 años hacia atrás
    .optional(),
});

export const validateUser = (userToValid: object) => {
  console.log("pasa por aqui", userToValid);

  const { error } = userSchema.validate(userToValid);
  if (error) {
    console.log(error);

    throw new ValidationErrror("User format invalid");
  }
};

const clientSchema = Joi.object({
  nDni: Joi.string()
    .min(6)
    .max(15)
    .pattern(/^[0-9]+$/)
    .required(),
  phone: Joi.string()
    .min(10)
    .max(15)
    .pattern(/^[0-9]+$/)
    .required(),
  profile_image: Joi.string()
    .uri({
      scheme: ["http", "https"],
    })
    .regex(/\.(jpg|jpeg|png|gif)$/)
    .required(),
  birthdate: Joi.date()
    .max("now")
    .timestamp("javascript") // La fecha de nacimiento no puede ser en el futuro
    .min(new Date(new Date().setFullYear(new Date().getFullYear() - 100))) // Establece un rango de 100 años hacia atrás
    .required(),
});

export const validateClient = (clientToValid: object) => {
  console.log("cliento to valid ", clientToValid);

  if (clientSchema.validate(clientToValid).error) {
    throw new ValidationErrror("Client format invalid");
  }
};

const clientToUpdateSchema = Joi.object({
  username: Joi.string().email().optional(),
  first_name: Joi.string().alphanum().min(3).max(50).optional(),
  last_name: Joi.string().alphanum().min(3).max(50).optional(),
  nDni: Joi.string()
    .min(6)
    .max(15)
    .pattern(/^[0-9]+$/)
    .optional(),
  phone: Joi.string()
    .min(10)
    .max(15)
    .pattern(/^[0-9]+$/)
    .optional(),
  profile_image: Joi.string()
    .uri({
      scheme: ["http", "https"],
    })
    .regex(/\.(jpg|jpeg|png|gif)$/)
    .optional(),
  birthdate: Joi.date()
    .max("now")
    .timestamp("javascript") // La fecha de nacimiento no puede ser en el futuro
    .min(new Date(new Date().setFullYear(new Date().getFullYear() - 100))) // Establece un rango de 100 años hacia atrás
    .optional(),
}).unknown(false);

export const validateClientToUpdate = (clientToValid: object) => {
  if (clientToUpdateSchema.validate(clientToValid).error) {
    throw new ValidationErrror("Client format invalid");
  }
};

const turnSchema = Joi.object({
  id_client: Joi.string().uuid(),
  id_admin: Joi.string().uuid(),
  date: Joi.date().min("now").required(),
  start_time: Joi.number()
    // 11 AM
    .greater(660)
    // 11:30 PM
    .less(1350),
  finish_time: Joi.number()
    // 11:30 AM
    .greater(690)
    // 12 PM
    .less(1380),
  id_fields: Joi.array().items(Joi.string().uuid()),
});

export const validateTurn = (turnToValidate: object) => {
  const { error } = turnSchema.validate(turnToValidate);
  logger.info("Message");
  console.log(error);

  if (error) {
    throw new ValidationErrror("Turn invalid");
  }
};
