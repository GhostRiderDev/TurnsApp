export const generateId = async (
  collection: [],
  id_name: string
): Promise<number> => {
  const id = await Math.max(...collection.map((item) => item[id_name]));
  return id;
};
