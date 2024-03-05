export interface Field {
  id_field: string;
  image_field: string;
  dimentions: TDimention;
  description: string;
}

export type TDimention = 1 | 2 | 3 | 4;
