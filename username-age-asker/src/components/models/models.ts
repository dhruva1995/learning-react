export interface UserInput {
  userName: string;
  age: string;
}

export interface UserData extends UserInput {
  id: number;
}

export interface ModalError {
  title: string;
  message: string;
}
