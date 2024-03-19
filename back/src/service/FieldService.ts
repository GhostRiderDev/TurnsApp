import { UUID } from "crypto";
import FieldEntity from "../entity/FieldEntity";
import ResourceNotFoundError from "../Error/ResourceNotFoundError";
import { FieldDAO } from "../repository/repositories";

export const getFieldsByIds = async (ids: UUID[]): Promise<FieldEntity[]> => {
  const fieldsToReturn: FieldEntity[] = await Promise.all(
    ids.map(async (id) => await getFieldById(id))
  );
  return fieldsToReturn;
};

export const getFieldById = async (id: UUID): Promise<FieldEntity> => {
  const field = await FieldDAO.findOneBy({
    id_field: id,
  });
  if (!field) {
    throw new ResourceNotFoundError("Field not found");
  }
  return field;
};

export const saveField = async (field: FieldEntity): Promise<FieldEntity> => {
  const savedField = await FieldDAO.save(field);
  return savedField;
};
