export interface Field {
  id_field: number;
  image_field: string;
  dimentions: TDimention;
  description: string;
}

type TDimention = [number, number];
