export interface User {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
}

export interface Expense {
  _id?: string;
  user?: User | any;
  text: string;
  customDate?: string;
  type: "income" | "expense";
  amount: number;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MongoDocument {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExpenseDocument extends MongoDocument, Omit<Expense, "_id"> {}
export interface UserDocument extends MongoDocument, User {}
export interface UserDataDocument extends MongoDocument, UserData {}

export interface UserData {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  token?: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  token: string;
}
