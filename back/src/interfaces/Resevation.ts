export interface IReservation {
  id_reservation: number;
  username_client: string;
  username_admin: string;
  id_fields: TField[];
  id_turn: number;
  date: Date;
  state: EState;
}

type TField = 1 | 2 | 3 | 4;

enum EState {
  ACTIVE = "Active",
  CANCELED = "Canceled",
}
